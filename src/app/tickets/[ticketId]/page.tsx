import Placeholder from "@/components/Placeholder";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/components/TicketItem";
import Link from "next/link";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === ticketId);

  if (!ticket)
    return (
      <Placeholder
        label="Ticket not found"
        button={
          <Link
            href={Routes.tickets}
            className={buttonVariants({ variant: "secondary" })}
          >
            Go to tickets
          </Link>
        }
      />
    );

  return (
    <div className="flex flex-col items-center animate-fade-in-from-top">
      <TicketItem ticket={ticket} isDetail />
    </div>
  );
}

export default TicketPage;
