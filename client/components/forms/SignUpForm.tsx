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
import { useToast } from "../ui/use-toast";

import { Button } from "../ui/button";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { signUpMutationFn } from "@/api/auth/auth.mutations";
import { ApiError } from "@/lib/api-error";
import { getQueryClient } from "../providers/QueryClientProvider";
import { logIn } from "@/lib/actions/auth.actions";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export function SignUpForm() {
  const { toast } = useToast();
  const signUpMutation = useMutation({
    mutationFn: signUpMutationFn,
    onError: (error) => {
      const err = ApiError.generate(error);

      toast(err);
    },
    onSuccess: async (data) => {
      toast({
        title: "Account created successfully",
      });

      console.log(data?.data);
      await logIn(data?.data);
      getQueryClient().resetQueries();
      window.location.href = "/";
    },
  });

  console.log(signUpMutation.data);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    signUpMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 relative z-20 bg-background p-5 rounded-md w-[350px]"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Folan Ibn Folan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  type="email"
                  {...field}
                />
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isLoading={signUpMutation.isPending} text="Submit" />

        <div className="flex items-center gap-1 text-sm">
          <p>You have an account already?</p>
          <Button asChild variant={"link"}>
            <Link href="/auth/log-in">Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
