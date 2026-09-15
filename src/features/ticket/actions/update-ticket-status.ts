"use server";

import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { actionError, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/is-owner";
import { TicketStatus } from "@prisma/client";
import { redirect } from "next/navigation";

export async function updateTicketStatus(id: string, status: TicketStatus) {
  const { user } = await getAuth();
  if (!user) redirect(Routes.signIn);

  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !isOwner(user, ticket)) return actionError("Not authorized");

    await prisma.ticket.update({
      where: { id, userId: user?.id },
      data: { status },
    });
    return actionSuccess();
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
