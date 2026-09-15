"use client";

import { Input } from "@/components/ui/input";
import { useNuqsLoadingToast } from "@/hooks/use-nuqs-loading-toast";
import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

export default function TicketSearchInput() {
  const { startTransition } = useNuqsLoadingToast("Searching tickets...");
  const [search, setSearch] = useQueryState(
    "search",
    searchParser.withOptions({ startTransition }),
  );

  return (
    <Input
      onChange={(e) => setSearch(e.target.value)}
      value={search ?? ""}
      placeholder={"Search tickets ..."}
    />
  );
}
