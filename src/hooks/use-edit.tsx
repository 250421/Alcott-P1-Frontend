import { useState, JSX, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Product } from "@/models/product";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { editProductSchema, EditProductSchemaType } from "@/features/auth/schemas/edit-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectPortal } from "@radix-ui/react-select";
import { DialogPortal } from "@radix-ui/react-dialog";

interface EditDialogProps {
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
}

function onSubmit(values: EditProductSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log((values));
}

export const useEdit = (currentProduct: Product | null): [
    () => Promise<Product | null>,
    (props: EditDialogProps) => JSX.Element
] => {
    const [state, setState] = useState<{
        resolve: (value: Product | null) => void
    } | null>(null);

    const confirm = () => new Promise<Product | null>((resolve) => setState({ resolve }));

    const handleConfirm = () => {
        state?.resolve({
            id: currentProduct?.id || -1,
            name: form.getValues("name") == "" ? currentProduct?.name : form.getValues("name"),
            description: form.getValues("description") == "" ? "No description provided" : form.getValues("description"),
            imageUrl: form.getValues("imageUrl"),
            price: form.getValues("price") <= 0 ? 999 : form.getValues("price"),
            stock: form.getValues("stock") < 0 ? 0 : form.getValues("stock"),
            category: form.getValues("category"),
        } as Product);
        console.log(state?.resolve)
        setState(null);
    }

    const handleCancel = () => {
        console.log(currentProduct);
        state?.resolve(null);
        setState(null);
    }

    const form = useForm<EditProductSchemaType>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            id: currentProduct?.id || -1,
            name: currentProduct?.name || "",
            description: currentProduct?.description || "",
            imageUrl: currentProduct?.imageUrl || "",
            price: currentProduct?.price || 0,
            stock: currentProduct?.stock || 999,
            category: currentProduct?.category || "All",
        },
    });

    useEffect(() => {
        if (currentProduct) {
            form.reset({
                id: currentProduct.id,
                name: currentProduct.name,
                description: currentProduct.description,
                imageUrl: currentProduct.imageUrl,
                price: currentProduct.price,
                stock: currentProduct.stock,
                category: currentProduct.category,
            });
        }
    }, [currentProduct, form]);

    const ConfirmDialog = ({
        title,
        description,
        confirmLabel = "Confirm",
        cancelLabel = "Cancel",
    }: EditDialogProps) => (
        <Dialog open={!!state} onOpenChange={handleCancel}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="No description provided" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="image url" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <div className="flex items-center gap-x-1">
                                            <p>
                                                $
                                            </p>
                                            <FormControl>
                                                <Input type="number" {...field} />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Stock</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Category</FormLabel>
                                        <FormControl>
                                        <Input placeholder="Category" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button variant="outline" onClick={handleCancel}>
                                {cancelLabel}
                            </Button>
                            <Button type="submit" onClick={handleConfirm}>
                                {confirmLabel}
                            </Button>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )

    return [
        confirm,
        ConfirmDialog
    ]
}