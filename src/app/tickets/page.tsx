import { initialTickets } from "@/data";
import Link from "next/link";

function TicketsPage() {
  return (
    <div className="p-4 flex flex-col w-120 mx-auto gap-3">
      {initialTickets.map((ticket) => (
        <div className="border rounded p-3 flex flex-col gap-2" key={ticket.id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.content}</p>
          <Link
            className="text-blue-500 underline text-sm"
            href={`/tickets/${ticket.id}`}
          >
            view
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TicketsPage;
