"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Toggle } from "@/components/ui/toggle"

import { Button } from "@/components/ui/button"
import React from "react"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "@tanstack/react-router"
import { useAuth } from "../../hooks/use-auth"
import { useConfirm } from "@/hooks/use-confirm"
import { useDeleteProducts } from "../../hooks/use-delete-products"
import { Product } from "@/models/product"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData extends Product, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const { data: user } = useAuth();
    const [rowSelection, setRowSelection] = React.useState({})
    const [deleteConfirm, DeleteDialog] = useConfirm();

    const { mutate: confirmDelete } = useDeleteProducts();

    const handleDelete = async () => {
        const ok = await deleteConfirm();
        if (!ok) return;

        confirmDelete(table.getSelectedRowModel().rows.map((row) => row.original)); // get the selected rows and pass them to the delete function
    }


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    })

    return (
        <div>
            <div className="justify-between flex items-center">
                <div className="flex items-center py-4 gap-x-5">
                    <Input
                        placeholder="Filter by name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Select onValueChange={(value) => table.getColumn("category")?.setFilterValue(value == "All" ? "" : value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                value="All">
                                All
                            </SelectItem>
                            <SelectItem
                                value="Attack Magic">
                                Attack Magic
                            </SelectItem>
                            <SelectItem
                                value="Defense Magic">
                                Defense Magic
                            </SelectItem>
                            <SelectItem
                                value="Healing Magic">
                                Healing Magic
                            </SelectItem>
                            <SelectItem
                                value="Support Magic">
                                Support Magic
                            </SelectItem>
                        </SelectContent>
                    </Select>


                </div>
                <div className="mx-5">
                    {user?.role === "ADMIN" // Delete selected button only for admin
                        && (table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate"))
                        && <Button variant="destructive" onClick={handleDelete}>Delete Selected</Button>
                    }
                    {user?.role === "ADMIN" // Confirm dialog for selected deletion
                        &&
                        <DeleteDialog
                            title={"Delete selected items from product listing"}
                            description={"This will delete all selected items from the product listing forever. Are you sure?"}
                            destructive={true}
                        />
                    }
                </div>
            </div>
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
