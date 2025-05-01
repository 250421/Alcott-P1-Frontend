import { createFileRoute, Link } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema, SignupSchemaType } from '@/features/auth/schemas/sign-up-schema';
import { useSignUp } from '@/features/auth/hooks/use-sign-up'
import { Loader } from 'lucide-react'

export const Route = createFileRoute('/(public)/_public/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  const { mutate: createUser, isPending } = useSignUp();


  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: SignupSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(createUser(values));
  }


  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="font-bold text-2xl">Register a new account</CardTitle>
        <CardDescription>Please enter a username and password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? (<Loader className="size-4 animate-spin" />)
              : ("Submit")}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-x-2 pt-4">
          <p>
            Already signed up?
          </p>
          <Link to={"/sign-in"} className="text-blue-500 underline">
              Sign In
          </Link>
        </div>
      </CardContent>
    </Card>

  );
}
