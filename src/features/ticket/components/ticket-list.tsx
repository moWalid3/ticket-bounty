import Placeholder from "@/components/placeholder";
import TicketItem from "@/features/ticket/components/ticket-item";
import { getTickets } from "../queries/get-tickets";
import { ParsedSearchParams } from "../search-params";
import TicketPagination from "./ticket-pagination";
import TicketSearchInput from "./ticket-search-input";
import TicketSortSelect from "./ticket-sort-select";

const sortOptions = [
  { sortKey: "createdAt", sortValue: "desc", label: "Newest" },
  { sortKey: "createdAt", sortValue: "asc", label: "Oldest" },
  { sortKey: "bounty", sortValue: "desc", label: "Bounty ↑" },
  { sortKey: "bounty", sortValue: "asc", label: "Bounty ↓" },
];

type TicketListProps = {
  onlyUserTickets?: boolean;
  searchParams: ParsedSearchParams;
};

async function TicketList({ onlyUserTickets, searchParams }: TicketListProps) {
  const { list: tickets, metadata } = await getTickets(
    searchParams,
    onlyUserTickets,
  );

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
      <div className="w-full max-w-md grid sm:grid-cols-[2fr_1fr] gap-2">
        <TicketSearchInput />
        <TicketSortSelect options={sortOptions} />
      </div>

      {tickets.length ? (
        tickets.map((ticket) => <TicketItem key={ticket.id} ticket={ticket} />)
      ) : (
        <Placeholder label="No tickets found" />
      )}

      <div className="w-full max-w-md">
        <TicketPagination paginatedMetadata={metadata} />
      </div>
    </div>
  );
}

export default TicketList;
