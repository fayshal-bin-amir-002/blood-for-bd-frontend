"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDonation } from "@/services/blood-donation";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeartPlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  note: z.string().trim().optional(),
  donation_date: z.date(),
});

const AddDonationModal = ({
  refetchDonations,
}: {
  refetchDonations: () => void;
}) => {
  const [addOpen, setAddOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
      donation_date: undefined,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await createDonation(values);
      if (res?.success) {
        toast.success(res?.message);
        refetchDonations();
        setAddOpen(false);
        form.reset();
      } else {
        toast.error(res?.message);
        res?.errorSources?.forEach((e: any) => toast.error(e.message));
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setAddOpen(true)}>
          Record New Donation <HeartPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
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
                name="donation_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Donation Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal border border-input text-foreground",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => field.onChange(date ?? null)}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={2015}
                          toYear={new Date().getFullYear()}
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
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
                  Submit {isSubmitting && <ButtonLoader />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDonationModal;
