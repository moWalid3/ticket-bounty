"use server";

import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { actionError, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/is-owner";
import { redirect } from "next/navigation";

export async function deleteComment(id: string) {
  const { user } = await getAuth();

  if (!user) redirect(Routes.signIn);

  try {
    const comment = await prisma.comment.findUnique({ where: { id } });

    if (!comment || !isOwner(user, comment)) {
      return actionError("Not authorized");
    }

    await prisma.comment.delete({ where: { id } });

    return actionSuccess();
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
