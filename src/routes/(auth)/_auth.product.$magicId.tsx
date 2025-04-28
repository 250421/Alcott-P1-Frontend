import { useGetProductById } from '@/features/auth/hooks/use-get-product-by-id';
import { createFileRoute, useParams } from '@tanstack/react-router'
import { Loader } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/(auth)/_auth/product/$magicId')({
  component: MagicIdPage,
})

function MagicIdPage() {
  const { magicId } = useParams({
    from: "/(auth)/_auth/product/$magicId"
  });
  const { data: magic, isLoading } = useGetProductById({
    id: magicId
  });

  if (isLoading) return (
    <div className="flex items-center h-screen justify-center">
      <Loader className="size-16 animate-spin" />
    </div>
  )

  return (
    <Card className="h-200 text-center bg-blue-100">
      <CardHeader>
        <CardTitle className="font-bold text-5xl">{magic?.name}</CardTitle>
        <Separator className="my-5 bg-blue-500"/>
        <img 
          src={magic?.imageUrl || "https://placehold.co/600x400?text=No+Image+Available"} 
          className="w-full h-100 object-contain rounded-lg scale-50"
        />
        <CardDescription className="my-10 text-xl italic">{magic?.description}</CardDescription>
        <Separator className="my-2 bg-blue-500"/>
      </CardHeader>
      
      <CardContent className="flex justify-center items-center gap-x-50 text-2xl">
        <p>Price: ${magic?.price.toPrecision(3)}</p>
        <p>In Stock: {magic?.stock}</p>
      </CardContent>
    </Card>
  )
}
