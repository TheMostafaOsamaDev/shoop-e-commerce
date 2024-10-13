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
import { useState } from "react";
import { logIn } from "@/lib/actions/auth.actions";
import { ApiError } from "@/lib/api-error";
import { useToast } from "../ui/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { authAdminMutationFn } from "@/api/auth/auth.mutations";
import { getQueryClient } from "../providers/QueryClientProvider";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function AdminForm({ text }: { text?: string }) {
  const [passkey, setPasskey] = useState("");
  const { toast } = useToast();
  const adminAuthMutation = useMutation({
    mutationFn: authAdminMutationFn,
    onSuccess: async (data) => {
      await logIn(data.data);
      getQueryClient().resetQueries();
      window.location.href = "/";
    },
    onError: (error) => {
      toast(ApiError.generate(error));
    },
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const adminAuthData = {
      email: values.email,
      passkey,
    };

    adminAuthMutation.mutate(adminAuthData);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} className="text-sm !px-0">
          {text ? text : "Click here."}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 relative z-20 bg-background p-5 rounded-md w-full"
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

            <Label>Passkey</Label>
            <InputOTP
              maxLength={6}
              onChange={setPasskey}
              defaultValue={passkey}
            >
              <InputOTPGroup className="otp-container">
                <InputOTPSlot className="otp-slot" index={0} />
                <InputOTPSlot className="otp-slot" index={1} />
                <InputOTPSlot className="otp-slot" index={2} />
                <InputOTPSlot className="otp-slot" index={3} />
                <InputOTPSlot className="otp-slot" index={4} />
                <InputOTPSlot className="otp-slot" index={5} />
              </InputOTPGroup>
            </InputOTP>

            <div className="flex items-center gap-3">
              <AlertDialogCancel
                asChild
                className="w-full"
                disabled={adminAuthMutation.isPending}
              >
                <Button variant={"secondary"} type="reset">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <SubmitButton
                isLoading={adminAuthMutation.isPending}
                text="Log in"
                isDisabled={!passkey}
              />
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
