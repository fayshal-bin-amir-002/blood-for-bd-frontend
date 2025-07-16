"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/auth";
import { useRouter, useSearchParams } from "next/navigation";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";

const formSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\d{11}$/, {
      message: "Phone number must be exactly 11 digits.",
    }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be minimum 6 characters long." }),
});

const LoginForm = () => {
  const { refreshUser } = useUser();

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await loginUser(values);
      await refreshUser();
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mx-auto"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="01XXXXXXXXX"
                    type="text"
                    {...field}
                    value={field?.value || ""}
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
                  <PasswordInput
                    autoComplete="off"
                    placeholder="******"
                    {...field}
                    value={field?.value || ""}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting}>
              Login
              {isSubmitting && <ButtonLoader />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
