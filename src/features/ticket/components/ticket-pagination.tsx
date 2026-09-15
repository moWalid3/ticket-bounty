"use client";

import { Pagination } from "@/components/pagination";
import { useNuqsLoadingToast } from "@/hooks/use-nuqs-loading-toast";
import { PaginatedData } from "@/types/pagination";
import { useQueryStates } from "nuqs";
import { paginationOPtions, paginationParser } from "../search-params";

type TicketPaginationProps = {
  paginatedMetadata: PaginatedData<unknown>["metadata"];
};

function TicketPagination({ paginatedMetadata }: TicketPaginationProps) {
  const { startTransition, isPending } = useNuqsLoadingToast("Loading page...");
  const [pagination, setPagination] = useQueryStates(paginationParser, {
    ...paginationOPtions,
    startTransition,
  });

  return (
    <Pagination
      onPagination={setPagination}
      paginatedMetadata={paginatedMetadata}
      pagination={pagination}
      disabled={isPending}
    />
  );
}

export default TicketPagination;
