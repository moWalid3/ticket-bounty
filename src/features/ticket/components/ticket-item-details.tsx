import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Routes } from "@/constants/routes";
import { Comments } from "@/features/comment/components/comments";
import { getComments } from "@/features/comment/queries/get-comments";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";

type TicketItemDetailsProps = { ticketId: string };

async function TicketItemDetails({ ticketId }: TicketItemDetailsProps) {
  const ticketPromise = getTicket(ticketId);
  const commentsPromise = getComments(ticketId);

  const [ticket, paginatedComments] = await Promise.all([
    ticketPromise,
    commentsPromise,
  ]);

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
        <TicketItem
          ticket={ticket}
          isDetail
          comments={
            <Comments
              paginatedComments={paginatedComments}
              ticketId={ticketId}
            />
          }
        />
      </div>
    </div>
  );
}

export default TicketItemDetails;
