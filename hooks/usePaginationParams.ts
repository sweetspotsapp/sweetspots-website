import { useSearchParams } from "next/navigation";
import * as React from "react";

export function usePaginationParams(defaultLimit = 10) {
  const searchParams = useSearchParams();

  const page = React.useMemo(() => {
    const p = Number(searchParams.get("page"));
    return Number.isFinite(p) && p > 0 ? p : 1;
  }, [searchParams]);

  const limit = React.useMemo(() => {
    const l = Number(searchParams.get("limit"));
    return Number.isFinite(l) && l > 0 ? l : defaultLimit;
  }, [searchParams, defaultLimit]);

  return { page, limit };
}