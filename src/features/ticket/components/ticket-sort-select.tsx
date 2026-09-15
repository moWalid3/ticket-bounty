"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { useNuqsLoadingToast } from "@/hooks/use-nuqs-loading-toast";
import { useQueryStates } from "nuqs";
import { sortOPtions, sortParser } from "../search-params";

type TicketSortSelectProps = { options: SortSelectOption[] };

function TicketSortSelect({ options }: TicketSortSelectProps) {
  const { startTransition } = useNuqsLoadingToast("Sorting results...");
  const [sort, setSort] = useQueryStates(sortParser, sortOPtions);

  function handleSort(newSort: { sortKey: string; sortValue: string }) {
    startTransition(() => {
      setSort(newSort);
    });
  }

  return <SortSelect options={options} value={sort} onChange={handleSort} />;
}

export default TicketSortSelect;
