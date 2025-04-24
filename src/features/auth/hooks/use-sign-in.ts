import { useMutation } from "@tanstack/react-query"
import { SignInSchemaType } from "../schemas/sign-in-schema"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useNavigate } from "@tanstack/react-router"

export const useSignIn = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (values: SignInSchemaType) => {
            const response = await axios.post("http://localhost:8080/auth/sign-in", values);
            return response.data;
        },
        onSuccess: () => {
            toast.success("User logged in");
            navigate({ to: "/"})
        },
        onError: (error) => {
            console.error(error);
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            }
        }
    })
}