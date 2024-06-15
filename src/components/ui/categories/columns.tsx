"use client"

import { getCategories, toggleCategoryStatus } from "@/lib/apiRequests";
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "price",
        header: "Price",
    },    
    {
        accessorKey: 'is_active', // assuming your category data has an 'isActive' property
        header: 'Status',
        // cell: info => (
        //   <button
        //     onClick={() => handleStatusChange(info.row.original)}
        //     className={`px-4 py-2 rounded ${
        //       info.row.original.is_active == 1 ? 'bg-green-500' : 'bg-red-500'
        //     } text-white`}
        //   >
        //     {info.row.original.is_active == 1 ? 'Active' : 'Inactive'}
        //   </button>
        // ),
      },
]
screenY


