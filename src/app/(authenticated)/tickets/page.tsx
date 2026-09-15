import CardCompact from "@/components/card-compact";
import { ErrorBoundary } from "@/components/custom-error-boundary";
import Heading from "@/components/heading";
import Spinner from "@/components/spinner";
import TicketList from "@/features/ticket/components/ticket-list";
import TicketUpsertForm from "@/features/ticket/components/ticket-upsert-form";
import { searchParamsCache } from "@/features/ticket/search-params";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type TicketsPageProps = { searchParams: Promise<SearchParams> };

function TicketsPage({ searchParams }: TicketsPageProps) {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading description="All your tickets at one place" title="Tickets" />

      <CardCompact
        title="Create Ticket"
        description="A new ticket will be created"
        content={<TicketUpsertForm />}
        className="max-w-md w-full self-center animate-fade-from-top"
      />

      <ErrorBoundary title="Fetching tickets failed!">
        <Suspense fallback={<Spinner />}>
          {searchParamsCache.parse(searchParams).then((searchPar) => (
            <TicketList searchParams={searchPar} onlyUserTickets />
          ))}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default TicketsPage;
