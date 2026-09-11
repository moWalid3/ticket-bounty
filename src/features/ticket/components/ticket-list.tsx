import { initialTickets } from "@/data";
import TicketItem from "@/features/ticket/components/ticket-item";
import { Ticket } from "../types";

async function TicketList() {
  const tickets = await new Promise<Ticket[]>(async (resolve) => {
    await new Promise((res) => setTimeout(() => res(null), 1000));
    resolve(initialTickets);
  });

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
}

export default TicketList;
