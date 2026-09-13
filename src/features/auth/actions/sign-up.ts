"use server";

import { prisma } from "@/lib/prisma";
import { generateRandomToken } from "../utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";
import { setSessionCookie } from "../utils/session-cookie";
import { createSession } from "../utils/session-management";
import {
  signUpSchema,
  SignUpValuesType,
} from "../validation/sign-up-validation";

type SignUpReturn = Promise<{
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}>;

export async function signUp(data: SignUpValuesType): SignUpReturn {
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { username, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return {
        success: false,
        error: "Registration failed",
        fieldErrors:
          existingUser.email === email
            ? { email: ["This email is already registered."] }
            : { username: ["This username is already taken."] },
      };
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, username, passwordHash },
    });

    const sessionToken = generateRandomToken();

    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);

    return { success: true };
  } catch {
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
