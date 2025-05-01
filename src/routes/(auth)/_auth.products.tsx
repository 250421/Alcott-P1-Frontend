
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductTable from '@/features/auth/components/product-listing/page'
import { useAdd } from '@/hooks/use-add';
import { useAddProduct } from '@/features/auth/hooks/use-add-product';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/(auth)/_auth/products')({
  component: ProductsPage,
})





function ProductsPage() {

  const { data: user } = useAuth();

  const [addProductConfirm, AddProductDialog] = useAdd();

  const { mutate: addProduct } = useAddProduct();

  const handleAdd = async () => {
    const ok = await addProductConfirm();
    if (!ok) return;

    addProduct(ok);
  }

  return (
    <div>
      <Card className="w-screen/2 my-10 h-screen/2 my-15">
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle className="flex items-center font-bold text-2xl justify-center">Products</CardTitle>
          {user?.role === "ADMIN" && 
              <Button size={"lg"} onClick={handleAdd} className="absolute right-25">
                Add new item <Plus/>
              </Button>
}
        </CardHeader>
        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>

      <AddProductDialog
        title={"Add new Product"}
        description={"Enter product information"}
      />
    </div>

  )
}
