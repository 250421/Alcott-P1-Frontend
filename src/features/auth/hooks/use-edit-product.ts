import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { EditProductSchemaType } from "../schemas/edit-product-schema";

export const useEditProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: EditProductSchemaType) => {
            const response = await axiosInstance.post("/auth/admin/add-magic", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product edits saved successfully");
            queryClient.invalidateQueries({
                queryKey: ["product"]
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