"use server";

import { actionError, actionSuccess } from "@/lib/actions";
import { getAuth } from "../queries/get-auth";
import { deleteSessionCookie } from "../utils/session-cookie";
import { invalidateSession } from "../utils/session-management";

export async function signOut() {
  const { session } = await getAuth();

  if (!session) return actionError();

  await invalidateSession(session.id);
  await deleteSessionCookie();

  return actionSuccess();
}
