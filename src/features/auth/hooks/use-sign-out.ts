import { axiosInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useSignOut = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post("/auth/sign-out", {});
            return response.data;
        },
        onSuccess: () => {
            toast.success("User logged out");
            navigate({ to: "/"})
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