import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { AddProductSchemaType } from "../schemas/add-product-schema";

export const useAddProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: AddProductSchemaType) => {
            const response = await axiosInstance.post("/auth/admin/add-magic", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product added successfully");
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
        },
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    })
}