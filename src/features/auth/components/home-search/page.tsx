
import { useProductList } from "../../hooks/use-product-list"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function AppSearchTable() {
    const { data } = useProductList();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data ?? []} />
        </div>
    )
}