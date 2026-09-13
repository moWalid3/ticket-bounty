"use server";

import { actionError, ActionState, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { generateRandomToken } from "../utils/crypto";
import { verifyPasswordHash } from "../utils/hash-and-verify";
import { setSessionCookie } from "../utils/session-cookie";
import { createSession } from "../utils/session-management";
import {
  signInSchema,
  SignInValuesType,
} from "../validation/sign-in-validation";

export async function signIn(data: SignInValuesType): Promise<ActionState> {
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return actionError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return actionError("Invalid email or password.");
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, password);

    if (!validPassword) {
      return actionError("Invalid email or password.");
    }

    const sessionToken = generateRandomToken();

    const session = await createSession(sessionToken, user.id);
    await setSessionCookie(sessionToken, session.expiresAt);

    return actionSuccess();
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
