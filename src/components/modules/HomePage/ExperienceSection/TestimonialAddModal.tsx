"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { getAllTestimonial, postToTestimonial } from "@/services/testimonial";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is Required"),
  address: z.string().trim().min(1, "Address is Required"),
  message: z
    .string()
    .min(30, "Message must be at least 30 character long")
    .max(200, "Message could not be more than 200 character"),
});

const TestimonialAddModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      message: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await postToTestimonial(values);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setIsOpen(true)}>
          ✍️ অভিজ্ঞতা যুক্ত করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] rounded-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>আপনার গল্প শেয়ার করুন</DialogTitle>
          <DialogDescription>
            আপনি কিভাবে রক্ত দিয়েছেন বা পেয়েছেন — সেই অভিজ্ঞতা আমাদের জানাতে
            পারেন।
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your name.."
                        type="text"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your address..."
                        type="text"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message"
                        className="resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end items-center gap-4 pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  Submit {isSubmitting && <ButtonLoader />}{" "}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialAddModal;
