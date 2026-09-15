"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { useNuqsLoadingToast } from "@/hooks/use-nuqs-loading-toast";
import { useQueryStates } from "nuqs";
import { sortOPtions, sortParser } from "../search-params";

type TicketSortSelectProps = { options: SortSelectOption[] };

function TicketSortSelect({ options }: TicketSortSelectProps) {
  const { startTransition } = useNuqsLoadingToast("Sorting results...");
  const [sort, setSort] = useQueryStates(sortParser, {
    ...sortOPtions,
    startTransition,
  });

  return <SortSelect options={options} value={sort} onChange={setSort} />;
}

export default TicketSortSelect;
