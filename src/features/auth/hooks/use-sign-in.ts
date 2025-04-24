import { useMutation } from "@tanstack/react-query"
import { SignInSchemaType } from "../schemas/sign-in-schema"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"
import { axiosInstance } from "@/lib/axios-config"
import { AxiosError } from "axios"

export const useSignIn = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (values: SignInSchemaType) => {
            const response = await axiosInstance.post("/auth/sign-in", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User logged in");
            navigate({ to: "/home"})
        },
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    })
}