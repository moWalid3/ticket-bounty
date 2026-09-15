import { Breadcrumbs } from "@/components/breadcrumbs";
import CardCompact from "@/components/card-compact";
import Spinner from "@/components/spinner";
import { Separator } from "@/components/ui/separator";
import { Routes } from "@/constants/routes";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function EditTicketPage({ params }: { params: Promise<{ ticketId: string }> }) {
  return (
    <Suspense fallback={<Spinner />}>
      {params.then(async ({ ticketId }) => {
        const ticket = await getTicket(ticketId);

        const isTicketFound = !!ticket;

        if (!isTicketFound || !ticket.isOwner) {
          notFound();
        }

        return (
          <div className="flex-1 flex flex-col gap-y-8">
            <Breadcrumbs
              breadcrumbs={[
                { title: "Tickets", href: Routes.tickets },
                { title: ticket.title, href: Routes.ticket(ticket.id) },
                { title: "Edit" },
              ]}
            />

            <Separator />

            <div className="flex-1 flex flex-col justify-center items-center">
              <CardCompact
                className="max-w-md w-full animate-fade-from-top"
                title="Edit Ticket"
                description="Edit an existing ticket"
                content={
                  <TicketUpsertForm
                    ticket={{ ...ticket, bounty: Number(ticket.bounty) }}
                  />
                }
              />
            </div>
          </div>
        );
      })}
    </Suspense>
  );
}

export default EditTicketPage;
