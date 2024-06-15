"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toggleCategoryStatus } from "@/lib/apiRequests"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  setResponse : any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setResponse 
}: DataTableProps<TData, TValue>) {

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  })



  // Function to toggle category status
  const handleStatusChange = async (category: Category) => {
    const body = {
      id: category.id,
      name: category.name,
      price: category.price,
      is_active: category.is_active == 1 ? 0 : category.is_active == 0 ? 1 : 0
    }
    // Send a request to your backend to update the category's status
    const res = await toggleCategoryStatus(category.id, body)
    setResponse(res)
  };

  return (
    <div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                      {cell.column.id === 'is_active' ? (
                        <button
                          onClick={() => {
                            // Call the handleStatusChange function with the row data and updateCategories callback
                            // @ts-ignore
                            handleStatusChange(row.original);
                          }}
                          className={`px-4 py-2 rounded ${
                            // @ts-ignore
                            row.original.is_active === 1 ? 'bg-green-500' : 'bg-red-500'
                            } text-white`}
                        >
                          {/*  @ts-ignore */}
                          {row.original.is_active === 1 ? 'Active' : 'Inactive'}
                        </button>
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* code for pagination buttons upto line 128 */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
