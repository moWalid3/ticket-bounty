"use server";

import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { actionError, actionSuccess } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { isOwner } from "@/utils/is-owner";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  upsertTicketSchema,
  UpsertTicketValuesType,
} from "../validation/upsert-ticket-validation";

export async function upsertTicket(data: UpsertTicketValuesType, id?: string) {
  const { user } = await getAuth();
  if (!user) redirect(Routes.signIn);

  const parsed = upsertTicketSchema.safeParse(data);

  if (!parsed.success) {
    return actionError("Validation failed", parsed.error.flatten().fieldErrors);
  }

  try {
    if (id) {
      const ticket = await prisma.ticket.findUnique({ where: { id } });

      if (!ticket || !isOwner(user, ticket)) {
        return actionError("Not authorized");
      }
    }

    const dbData = {
      ...parsed.data,
      userId: user.id,
      deadline: format(parsed.data.deadline, "yyyy-MM-dd"),
    };

    await prisma.ticket.upsert({
      where: { id: id ?? "" },
      update: dbData,
      create: dbData,
    });

    revalidatePath(Routes.tickets);

    return actionSuccess();
  } catch {
    return actionError("An unexpected error occurred. Please try again later.");
  }
}
