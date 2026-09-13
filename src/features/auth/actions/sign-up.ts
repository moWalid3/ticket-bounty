"use server";

import { actionError, ActionState, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { generateRandomToken } from "../utils/crypto";
import { hashPassword } from "../utils/hash-and-verify";
import { setSessionCookie } from "../utils/session-cookie";
import { createSession } from "../utils/session-management";
import {
  signUpSchema,
  SignUpValuesType,
} from "../validation/sign-up-validation";

export async function signUp(data: SignUpValuesType): Promise<ActionState> {
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return actionError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  const { username, email, password } = parsed.data;

  try {
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      const fieldErrors =
        existingUser.email === email
          ? { email: ["This email is already registered."] }
          : { username: ["This username is already taken."] };

      return actionError("Registration failed", fieldErrors);
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, username, passwordHash },
    });

    const sessionToken = generateRandomToken();

    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);

    return actionSuccess();
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
