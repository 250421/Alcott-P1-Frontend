import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Product } from "../components/product-listing/columns";



export const useProductList = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async (): Promise<Product[] | null> => {
            try {
                const response = await axiosInstance.get("/auth/list-magics");
                return response.data;
            } catch (error) {
                console.error(error);
                if (error instanceof AxiosError) {
                    toast.error(error.response?.data.message);
                }
                return null;
            }
        }
    })
}