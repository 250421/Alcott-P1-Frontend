import { useMutation } from "@tanstack/react-query"
import { SignupSchemaType } from "../schemas/sign-up-schema"
import { axiosInstance } from "@/lib/axios-config"
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";

export const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (values: SignupSchemaType) => {
            const response = await axiosInstance.post("/auth/sign-up", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User created");
            navigate({ to: "/home"})
        },
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    });
}