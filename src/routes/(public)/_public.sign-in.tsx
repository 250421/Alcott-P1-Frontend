import { createFileRoute, Link } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema, SignupSchemaType } from '@/features/auth/schemas/sign-up-schema';
import { useSignUp } from '@/features/auth/hooks/use-sign-up'
import { signinSchema, SignInSchemaType } from '@/features/auth/schemas/sign-in-schema'
import { useSignIn } from '@/features/auth/hooks/use-sign-in'

export const Route = createFileRoute('/(public)/_public/sign-in')({
    component: SignInPage,
  })
  
  function SignInPage() {
    
    const {mutate: login } = useSignIn();
  
    const form = useForm<SignInSchemaType>({
      resolver: zodResolver(signinSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });
  
    function onSubmit(values: SignInSchemaType) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(login(values));
    }
  
  
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Sign In</CardTitle>
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
                    <FormLabel>Username</FormLabel>
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
  
          <div className="flex items-center gap-x-2 pt-4">
            <p>
              Don&apos;t have an account?
            </p>
            <Link to={"/sign-up"} className="text-blue-500 underline">
                Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
  
    );
  }
  
