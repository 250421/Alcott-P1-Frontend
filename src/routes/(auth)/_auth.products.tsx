
import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ProductTable from '@/features/auth/components/product-listing/page'

export const Route = createFileRoute('/(auth)/_auth/products')({
  component: ProductsPage,
})

function ProductsPage() {

  return (
    <Card className="w-screen/2 my-5">
        <CardHeader>
          <CardTitle className="flex items-center font-bold text-2xl justify-center">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable/>
        </CardContent>
    </Card>
  )
}
