"use client";

import { Input } from "@/components/ui/input";
import { useNuqsLoadingToast } from "@/hooks/use-nuqs-loading-toast";
import { useQueryState, useQueryStates } from "nuqs";
import { paginationParser, searchParser } from "../search-params";

export default function TicketSearchInput() {
  const { startTransition } = useNuqsLoadingToast("Searching tickets...");
  const [search, setSearch] = useQueryState(
    "search",
    searchParser.withOptions({ startTransition }),
  );
  const [, setPagination] = useQueryStates(paginationParser);

  function handleSearch(term: string) {
    setSearch(term);
    setPagination({ page: 0 });
  }

  return (
    <Input
      onChange={(e) => handleSearch(e.target.value)}
      value={search ?? ""}
      placeholder={"Search tickets ..."}
    />
  );
}
