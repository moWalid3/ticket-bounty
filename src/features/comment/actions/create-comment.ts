"use server";

import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { actionError, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CommentWithMetadata } from "../types";
import {
  createCommentSchema,
  CreateCommentValuesType,
} from "../validation/create-comment-validation";

export async function createComment(
  data: CreateCommentValuesType,
  ticketId: string,
) {
  const { user } = await getAuth();

  if (!user) redirect(Routes.signIn);

  const parsed = createCommentSchema.safeParse(data);

  if (!parsed.success) {
    return actionError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  try {
    const comment = await prisma.comment.create({
      data: { userId: user.id, ticketId, ...parsed.data },
      include: { user: { select: { username: true } } },
    });

    return actionSuccess<CommentWithMetadata>({ ...comment, isOwner: true });
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
