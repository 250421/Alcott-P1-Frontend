"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    Row,
    SortingFn,
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

import { Button } from "@/components/ui/button"
import React from "react"
import { Input } from "@/components/ui/input"
import { Product } from "./columns"

interface DataTableProps<Tdata, TValue> {
    columns: ColumnDef<Tdata, TValue>[]
    data: Tdata[]
}

export function DataTable<TData extends Product, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState<string>(""); // the global filter state

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            // Custom global filter function to check both name and description
            const name = row.original.name.toLowerCase();
            const description = row.original.description.toLowerCase();
            const searchValue = filterValue.toLowerCase();
            return name.includes(searchValue) || description.includes(searchValue);
        },
    });

    return (
        <div>
            <div className="flex items-center py-4 gap-x-5">
                <Input
                    placeholder="Search by name or description..."
                    value={globalFilter}
                    onChange={(event) => setGlobalFilter(event.target.value)} // update global filter
                    className="max-w-sm"
                />
                <Select onValueChange={(value) => table.getColumn("category")?.setFilterValue(value=="All" ? "" : value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category"/>
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
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
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
    );
}
