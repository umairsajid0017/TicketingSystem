"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Ticket = {
    id: number
    category_id: number
    amount: number
    quantity : number
    created_at: string
    status: "pending" | "processing" | "success" | "failed"

}

export const columns: ColumnDef<Ticket>[] = [
    {
        accessorKey: "id",
        header: "Order_Id"
    },
    {
        accessorKey: "ticket_number",
        header: "Ticket number",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    }, 
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "category_name",
        header: "Category"
    },
      
    {
        accessorKey: "created_at",
        header: "Date",
    },
     
]
screenY