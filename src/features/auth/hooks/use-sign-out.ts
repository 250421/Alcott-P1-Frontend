import { axiosInstance } from "@/lib/axios-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSignOut = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("/auth/sign-out");
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["auth"]
            });
            toast.success("User logged out");
            navigate({ to: "/sign-in"})
        },
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
            //navigate({ to: "/sign-in"})
        }
    })
}