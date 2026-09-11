import Heading from "@/components/Heading";
import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/components/TicketItem";

function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading description="All your tickets at one place" title="Tickets" />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <TicketItem key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}

export default TicketsPage;
