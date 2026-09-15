import { PaginatedData } from "@/types/pagination";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PageAndSize = { page: number; size: number };

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: PaginatedData<unknown>["metadata"];
  disabled?: boolean;
};

const Pagination = ({
  pagination,
  onPagination,
  paginatedMetadata: { count, hasNextPage },
  disabled,
}: PaginationProps) => {
  const startOffset = pagination.page * pagination.size + 1;
  const endOffset = startOffset - 1 + pagination.size;
  const actualEndOffset = Math.min(endOffset, count);

  const label = `${startOffset}-${actualEndOffset} of ${count}`;

  function handlePreviousPage() {
    onPagination({ ...pagination, page: pagination.page - 1 });
  }

  function handleNextPage() {
    onPagination({ ...pagination, page: pagination.page + 1 });
  }

  function handleChangeSize(size: string | null) {
    onPagination({ page: 0, size: size ? +size : pagination.size });
  }

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={disabled || !hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select onValueChange={handleChangeSize} value={pagination.size.toString()}>
      <SelectTrigger disabled={disabled}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
};

export { Pagination };
