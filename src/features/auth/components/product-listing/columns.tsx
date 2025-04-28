"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Product = {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
    category: string,
    imageUrl: string
}

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const text = "" + row.getValue("name");
            return (
                <div>
                    <Link
                        key={row.original.id}
                        to={"/product/$magicId"}
                        params={{ magicId: row.original.id.toString() }}
                        className="mx-3 text-left font-medium">
                        {text}
                    </Link>
                </div>
            )
        }
    },
    {
        accessorKey: "price",
        header: () => <div className="text-left">Price</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const text = "" + row.getValue("category");
            return <div className="mx-3 text-left font-medium"> {text} </div>
        }
    },
]