import { initialTickets } from "@/data";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

async function TicketPage({ params }: TicketPageProps) {
  const { ticketId } = await params;
  const ticket = initialTickets.find((ticket) => ticket.id === +ticketId);

  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="p-8">
      <h1>{ticket.title}</h1>
      <h1>{ticket.content}</h1>
    </div>
  );
}

export default TicketPage;
