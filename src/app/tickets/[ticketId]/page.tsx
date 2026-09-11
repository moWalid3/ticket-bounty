import Placeholder from "@/components/Placeholder";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { initialTickets } from "@/data";
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
    <div className="p-8">
      <h1>{ticket.title}</h1>
      <h1>{ticket.content}</h1>
    </div>
  );
}

export default TicketPage;
