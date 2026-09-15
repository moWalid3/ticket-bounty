import {
  createSearchParamsCache,
  debounce,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParser = parseAsString
  .withDefault("")
  .withOptions({
    shallow: false,
    clearOnDefault: true,
    limitUrlUpdates: debounce(250),
  });

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};
export const sortOPtions = { shallow: false, clearOnDefault: true };

export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};
export const paginationOPtions = { shallow: false, clearOnDefault: true };

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
