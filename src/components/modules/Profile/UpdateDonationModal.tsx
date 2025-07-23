"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateDonation } from "@/services/blood-donation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
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
import { IDonation } from "@/types";

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  note: z.string().trim().optional(),
  donation_date: z.date(),
});

const UpdateDonationModal = ({
  refetchDonations,
  donation,
  openEdit,
  setOpenEdit,
}: {
  refetchDonations: () => void;
  donation: IDonation | null;
  openEdit: boolean;
  setOpenEdit: (s: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
      donation_date: undefined,
    },
  });

  useEffect(() => {
    if (donation) {
      form.reset({
        title: donation.title || "",
        note: donation.note || "",
        donation_date: donation.donation_date
          ? new Date(donation.donation_date)
          : undefined,
      });
    }
  }, [donation, form]);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateDonation(values, donation?.id as string);
      if (res?.success) {
        toast.success(res?.message);
        refetchDonations();
        setOpenEdit(false);
        form.reset();
      } else {
        toast.error(res?.message);
        res?.errorSources?.forEach((e: any) => toast.error(e.message));
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={openEdit} onOpenChange={setOpenEdit}>
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
                  Update {isSubmitting && <ButtonLoader />}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDonationModal;
