import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Action<T> = {
  label: string;
  onClick: (item: T) => void;
};

type CellRenderer<T, K extends keyof T = keyof T> = (
  value: T[K],
  item: T,
  key: K
) => React.ReactNode;

type DataTableProps<T extends Record<string, any>> = {
  /** Rows */
  items: T[];
  /** Optional table caption */
  caption?: string;
  /** Row actions */
  actions?: Action<T>[];
  /** Keys to exclude (hidden columns) */
  excludeFields?: (keyof T)[];
  /** Per-column renderers (slots) */
  cellRenderers?: Partial<{ [K in keyof T]: CellRenderer<T, K> }>;
  /** Global fallback renderer if a column slot isn't provided */
  renderCell?: CellRenderer<T>;
  /** Optional header labels override per column */
  headerLabels?: Partial<Record<keyof T, React.ReactNode>>;
  /** Optional per-column classes for <TableCell> */
  columnClasses?: Partial<Record<keyof T, string>>;
  /** Optional explicit column order (only keys present + not excluded are used) */
  columnOrder?: (keyof T)[];
  isLoading?: boolean;
};

export function DataTable<T extends Record<string, any>>({
  items,
  caption,
  actions = [],
  excludeFields = [],
  cellRenderers,
  renderCell,
  headerLabels,
  columnClasses,
  isLoading,
  columnOrder,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        No data available
      </div>
    );
  }
  // 1) Base headers from first row
  const baseHeaders = Object.keys(items[0]) as (keyof T)[];
  // 2) Apply excludeFields
  const included = baseHeaders.filter((h) => !excludeFields.includes(h));
  // 3) Apply optional columnOrder (preserve only included)
  const headers: (keyof T)[] = columnOrder
    ? columnOrder.filter((h) => included.includes(h))
    : included;

  const defaultRender: CellRenderer<T> = (value) => {
    if (React.isValidElement(value)) return value;
    if (typeof value === "object" && value !== null)
      return JSON.stringify(value);
    return String(value ?? "");
  };

  return (
    <div className="rounded-md border">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={String(header)} className="capitalize">
                {headerLabels?.[header] ?? String(header).replace(/_/g, " ")}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {headers.map((header) => {
                const value = item[header];
                const slot = cellRenderers?.[header] as
                  | CellRenderer<T, typeof header>
                  | undefined;
                const content =
                  slot?.(value, item, header) ??
                  renderCell?.(value, item, header) ??
                  defaultRender(value, item, header);

                return (
                  <TableCell
                    key={String(header)}
                    className={columnClasses?.[header]}
                  >
                    {content}
                  </TableCell>
                );
              })}

              {actions.length > 0 && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {actions.map((action, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={() => action.onClick(item)}
                        >
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
