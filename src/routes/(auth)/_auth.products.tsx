import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/products')({
  component: ProductsPage,
})

function ProductsPage() {
  return <div className="flex items-center h-screen justify-center">Products screen!</div>
}
