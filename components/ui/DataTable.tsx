import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

export type Action<T> = {
  label: string
  onClick: (item: T) => void
}

type DataTableProps<T extends Record<string, any>> = {
  /** Array of objects to render as rows */
  items: T[]
  /** Optional table caption */
  caption?: string
  /** Actions for each row */
  actions?: Action<T>[]
  /** Keys to exclude from rendering as table columns */
  excludeFields?: (keyof T)[]
}

export function DataTable<T extends Record<string, any>>({
  items,
  caption,
  actions = [],
  excludeFields = [],
}: DataTableProps<T>) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        No data available
      </div>
    )
  }

  // Dynamically extract table headers from the first item
  const headers = (Object.keys(items[0]) as (keyof T)[]).filter(
    (header) => !excludeFields.includes(header)
  )

  return (
    <div className="rounded-md border">
      <Table>
        {caption && <TableCaption>{caption}</TableCaption>}

        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={String(header)} className="capitalize">
                {String(header).replace(/_/g, " ")}
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
              {headers.map((header) => (
                <TableCell key={String(header)}>
                  {typeof item[header] === "object"
                    ? JSON.stringify(item[header])
                    : String(item[header])}
                </TableCell>
              ))}
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
  )
}