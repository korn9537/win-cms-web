import _ from "lodash";
import { useState } from "react";

export const usePaging = (options?: { page?: number; pageSize?: number; search?: string }) => {
  const [search, setSearch] = useState<string>(options?.search || "");
  const [page, setPage] = useState<number>(options?.page || 1);
  const [pageSize, setPageSize] = useState<number>(options?.pageSize || 10);

  const handleSearchChange = _.debounce((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return {
    search,
    setSearch,
    page,
    setPage,
    pageSize,
    setPageSize,
    handleSearchChange
  };
};
