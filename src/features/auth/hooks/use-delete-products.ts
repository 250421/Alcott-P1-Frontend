import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../components/product-listing/columns";
import { axiosInstance } from "@/lib/axios-config";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useDeleteProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (values: Product[]) => {
            const response = await axiosInstance.post("/auth/admin/delete-magics", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Selected items deleted successfully");
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