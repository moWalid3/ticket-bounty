import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Routes } from "@/constants/routes";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketItemDetailsProps = { ticketId: string };

async function TicketItemDetails({ ticketId }: TicketItemDetailsProps) {
  const ticket = await getTicket(ticketId);

  if (!ticket) notFound();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Tickets", href: Routes.tickets },
          { title: ticket.title },
        ]}
      />

      <Separator />

      <div className="flex flex-col items-center animate-fade-in-from-top">
        <TicketItem ticket={ticket} isDetail />
      </div>
    </div>
  );
}

export default TicketItemDetails;
