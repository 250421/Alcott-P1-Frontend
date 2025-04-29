import { useState, JSX } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Product } from "@/models/product";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { editProductSchema, EditProductSchemaType } from "@/features/auth/schemas/edit-product-schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

export const useEdit = (id: number): [
    () => Promise<Product | null>,
    (props: EditDialogProps) => JSX.Element
] => {
    const [state, setState] = useState<{
        resolve: (value: Product | null) => void
    } | null>(null);

    const confirm = () => new Promise<Product | null>((resolve) => setState({ resolve }));

    const handleConfirm = () => {
        state?.resolve({
            id: id,
            name: form.getValues("name"),
            description: form.getValues("description"),
            imageUrl: form.getValues("imageUrl"),
            price: form.getValues("price"),
            stock: form.getValues("stock"),
            category: form.getValues("category"),
        } as Product);
        console.log(state?.resolve)
        setState(null);
    }

    const handleCancel = () => {
        state?.resolve(null);
        setState(null);
    }

    const form = useForm<EditProductSchemaType>({
        resolver: zodResolver(editProductSchema),
        defaultValues: {
            id: id,
            name: "",
            description: "",
            imageUrl: "",
            price: 0,
            stock: 0,
            category: "",
        },
    });

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
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
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