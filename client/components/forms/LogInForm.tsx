"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "../SubmitButton";
import { useRouter } from "next/navigation";
import { ToastAction } from "@radix-ui/react-toast";
import { ApiError } from "@/lib/api-error";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import Link from "next/link";
import { AdminForm } from "./AdminForm";
import { useMutation } from "@tanstack/react-query";
import { logInMutationFn } from "@/api/auth/auth.mutations";
import { logIn } from "@/lib/actions/auth.actions";
import { getQueryClient } from "../providers/QueryClientProvider";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LogInForm() {
  const router = useRouter();
  const { toast } = useToast();

  const logInMutation = useMutation({
    mutationFn: logInMutationFn,
    onSuccess: async (data) => {
      const logInData = data?.data;

      if (logInData) {
        await logIn(logInData);
        getQueryClient().invalidateQueries();
      }
    },
    onError: (error) => {
      const err: any = ApiError.generate(error);

      if (err.status === 404) {
        err.action = (
          <ToastAction
            altText="Sign up"
            onClick={() => router.push("/auth/sign-up")}
          >
            Sign up
          </ToastAction>
        );
      }

      toast(err);
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    logInMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative z-20 bg-background p-5 rounded-md w-[350px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={logInMutation.isPending} text="Log in" />

        <div className="flex items-center justify-between xl:hidden">
          <Button asChild type="button" variant={"ghost"}>
            <Link href="/auth/sign-up"> Sign up</Link>
          </Button>

          <AdminForm text="Admin" />
        </div>
      </form>
    </Form>
  );
}
