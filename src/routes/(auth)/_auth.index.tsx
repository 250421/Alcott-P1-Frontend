import { Button } from '@/components/ui/button';
import { SidebarSeparator } from '@/components/ui/sidebar'
import ProductTable from '@/features/auth/components/product-listing/page'
import { useAddProduct } from '@/features/auth/hooks/use-add-product';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { useAdd } from '@/hooks/use-add';
import { createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react';


export const Route = createFileRoute('/(auth)/_auth/')({
    component: Index,
})

function Index() {

    const { data: user } = useAuth();

    const [addProductConfirm, AddProductDialog] = useAdd();

    const { mutate: addProduct } = useAddProduct();

    const handleAdd = async () => {
        const ok = await addProductConfirm();
        if (!ok) return;

        addProduct(ok);
    }


    return ( // HTML part goes here
        <div className="justify-center items-center flex flex-col">
            <h6 className="text-3xl font-bold">Search</h6>
            <SidebarSeparator className="my-10" />
            <div className="flex justify-end">
            {user?.role === "ADMIN" &&
                <Button size={"lg"} onClick={handleAdd}>
                    Add new item <Plus />
                </Button>
            }
            </div>
            <ProductTable />

            <AddProductDialog
                title={"Add new Product"}
                description={"Enter product information"}
            />
        </div>
    )

}