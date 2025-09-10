"use client";

import * as React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ApiPluralResponse,
  PaginationCore,
  PaginationResult,
} from "@/api/pagination.dto";

type PaginatorSource<T> =
  | PaginationCore
  | PaginationResult<T>
  | ApiPluralResponse<T>;

function extractPagination<T>(src: PaginatorSource<T>): PaginationCore | null {
  if ((src as ApiPluralResponse<T>)?.data?.pagination) {
    return (src as ApiPluralResponse<T>).data!.pagination;
  }
  // PaginationResult<T>
  if ((src as PaginationResult<T>)?.pagination) {
    return (src as PaginationResult<T>).pagination;
  }
  // PaginationCore
  const maybeCore = src as PaginationCore;
  if (
    typeof maybeCore?.page === "number" &&
    typeof maybeCore?.limit === "number" &&
    typeof maybeCore?.total === "number" &&
    typeof maybeCore?.totalPages === "number"
  ) {
    return maybeCore;
  }
  return null;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Build an array like: [1, '…', 7, 8, 9, '…', 25]
 * window = how many pages to show on each side of current (default 1 => current-1, current, current+1)
 */
function buildPageItems(current: number, totalPages: number, window = 1) {
  const items: Array<number | "ellipsis"> = [];

  const first = 1;
  const last = totalPages;

  const start = clamp(current - window, first, last);
  const end = clamp(current + window, first, last);

  const pushRange = (a: number, b: number) => {
    for (let i = a; i <= b; i++) items.push(i);
  };

  // Always include first
  items.push(first);

  // Left ellipsis?
  if (start > first + 1) {
    items.push("ellipsis");
  }

  // Middle window
  pushRange(Math.max(start, first + 1), Math.min(end, last - 1));

  // Right ellipsis?
  if (end < last - 1) {
    items.push("ellipsis");
  }

  // Always include last (if > 1)
  if (last > first) items.push(last);

  // Deduplicate just in case
  return items.filter((v, i, arr) => {
    if (i === 0) return true;
    return !(v === arr[i - 1]);
  });
}

type PaginatorProps<T> = {
  /** Your API response / pagination container */
  source: PaginatorSource<T>;

  /** Controlled mode: handle page changes yourself (no navigation) */
  onPageChange?: (page: number) => void;

  /** Optional custom href builder for link mode (overrides router-based default) */
  makeHref?: (page: number) => string;

  /** Query param names (for link mode with default builder) */
  pageParam?: string; // default "page"
  limitParam?: string; // default "limit"

  /** Number of neighboring pages around current to show */
  window?: number; // default 1

  /** Disable prev/next at edges (defaults true) */
  edgeDisabled?: boolean;
};

export function Paginator<T>({
  source,
  onPageChange,
  makeHref,
  pageParam = "page",
  limitParam = "limit",
  window = 1,
  edgeDisabled = true,
}: PaginatorProps<T>) {
  const pagination = extractPagination(source);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = pagination?.page;
  const totalPages = pagination?.totalPages;
  const limit = pagination?.limit;

  const defaultHref = React.useCallback(
    (targetPage: number) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set(pageParam, String(targetPage));
      if (limit && !params.get(limitParam)) {
        params.set(limitParam, String(limit));
      }
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams, pageParam, limitParam, limit]
  );

  if (!pagination || !totalPages || totalPages <= 1 || !page || !limit) {
    // Nothing to paginate
    return null;
  }


  const hrefFor = (p: number) => (makeHref ? makeHref(p) : defaultHref(p));

  const goPrev = clamp(page - 1, 1, totalPages);
  const goNext = clamp(page + 1, 1, totalPages);

  const items = buildPageItems(page, totalPages, window);

  const isEdgeDisabled = (target: number) =>
    edgeDisabled ? target === page : false;

  const handleClick = (p: number, e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(p);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={hrefFor(goPrev)}
            onClick={(e) => handleClick(goPrev, e)}
            aria-disabled={edgeDisabled && page === 1}
          />
        </PaginationItem>

        {/* Numbered items + ellipses */}
        {items.map((it, idx) =>
          it === "ellipsis" ? (
            <PaginationItem key={`e-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={it}>
              <PaginationLink
                href={hrefFor(it)}
                onClick={(e) => handleClick(it, e)}
                isActive={it === page}
                aria-current={it === page ? "page" : undefined}
                aria-disabled={isEdgeDisabled(it)}
              >
                {it}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={hrefFor(goNext)}
            onClick={(e) => handleClick(goNext, e)}
            aria-disabled={edgeDisabled && page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
