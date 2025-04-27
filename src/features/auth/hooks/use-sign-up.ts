import { useMutation } from "@tanstack/react-query"
import { SignupSchemaType } from "../schemas/sign-up-schema"
import { axiosInstance } from "@/lib/axios-config"
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";

// This is essentially a "POST request" with additional navigation on success.
export const useSignUp = () => {
    const navigate = useNavigate(); // pre-defined navigate function from tanstack router
    return useMutation({
        // This is the POST part (mutation = POST/UPDATE(PATCH)/DELETE)
        mutationFn: async (values: SignupSchemaType) => {
            const response = await axiosInstance.post("/auth/sign-up", values);
            return response.data;
        },
        // This is what happens on a successful return.
        onSuccess: () => {
            toast.success("User created");
            navigate({ to: "/sign-in"})
        },
        // Additional logic for when an error occurs
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    });
}