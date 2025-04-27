import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/categories')({
  component: CategoriesPage,
})

function CategoriesPage() {
  return ( // HTML part goes here
      <div>Categories screen!</div>
  )
}

export default CategoriesPage;