import Spinner from "@/components/spinner";
import TicketItemDetails from "@/features/ticket/components/ticket-item-details";
import { Suspense } from "react";

type TicketPageProps = {
  params: Promise<{ ticketId: string }>;
};

async function TicketPage({ params }: TicketPageProps) {
  return (
    <Suspense fallback={<Spinner />}>
      {params.then(({ ticketId }) => (
        <TicketItemDetails ticketId={ticketId} />
      ))}
    </Suspense>
  );
}

export default TicketPage;
