import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios-config";
import { Product } from "@/models/product";

interface UseGetProductByIdProps {
    id: string;
}

export const useGetProductById = ({ id }: UseGetProductByIdProps) => {
    return useQuery({
       queryKey: ["product"],
       queryFn: async (): Promise<Product | null> => {
        try{
            const response = await axiosInstance.get(`/auth/magic/${id}`);
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