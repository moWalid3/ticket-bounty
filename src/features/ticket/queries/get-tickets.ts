import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

export async function getTickets() {
  const { user } = await getAuth();

  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { username: true } } },
  });

  return tickets.map((ticket) => ({
    ...ticket,
    isOwner: ticket.userId === user?.id,
  }));
}
