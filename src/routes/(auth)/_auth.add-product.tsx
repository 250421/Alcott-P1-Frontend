import { Button } from '@/components/ui/button';
import { useAddProduct } from '@/features/auth/hooks/use-add-product';
import { useAdd } from '@/hooks/use-add';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/add-product')({
  component: AddProductPage,
})

function AddProductPage() {
  const [addProductConfirm, AddProductDialog] = useAdd();

  const { mutate: addProduct } = useAddProduct();

  const handleAdd = async () => {
    const ok = await addProductConfirm();
    if (!ok) return;

    addProduct(ok);
  }
  
  return ( // HTML part goes here
    <div className="flex items-center my-50 justify-center">
      <Button onClick={handleAdd} className="w-100 h-100 bg-purple-500 text-yellow-300 text-3xl hover:bg-green-500 hover:text-green-800"> Add new product </Button>

      <AddProductDialog
        title={"Add new Product"}
        description={"Enter product information"}
      />
    </div>
  )
}

export default AddProductPage;