"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { bloodGroupOptions } from "@/constants";
import { useUser } from "@/context/UserContext";
import { getDonorProfile, updateDonorProfile } from "@/services/donor";

import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  contact_number: z
    .string()
    .trim()
    .regex(/^\d{11}$/, {
      message: "Contact number must be exactly 11 digits.",
    }),
  blood_group: z.string().trim().min(1, "Blood Group is required"),
  last_donation_date: z.date().optional(),
});

const UpdateProfileForm = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contact_number: "",
      blood_group: "",
      last_donation_date: undefined,
    },
  });

  const refetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getDonorProfile();
      if (res?.success && res?.data) {
        const { name, contact_number, blood_group, last_donation_date } =
          res.data;

        form.reset({
          name: name || "",
          contact_number: contact_number || "",
          blood_group: blood_group || "",
          last_donation_date: last_donation_date
            ? new Date(last_donation_date)
            : undefined,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch profile.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchProfile();
  }, []);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateDonorProfile(values);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        await refetchProfile();
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
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "space-y-8 w-full mx-auto p-6 md:p-8 lg:p-10 bg-gray-50 rounded-2xl shadow-md",
            loading && "pointer-events-none opacity-50"
          )}
        >
          {/* name and contact number */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
            </div>
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
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
            </div>
          </div>
          {/* blood group & last donation date */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="blood_group"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field?.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodGroupOptions?.map((bg) => (
                          <SelectItem key={bg.value} value={bg.value}>
                            {bg.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="last_donation_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Last Donation Date (Optional)</FormLabel>
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
            </div>
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting || !user?.isDonor}>
              Update Profile {isSubmitting && <ButtonLoader />}
            </Button>
          </div>
        </form>
      </Form>

      {loading && (
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
          <div className="text-center flex justify-center items-center gap-2">
            <ButtonLoader />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Loading your profile...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfileForm;
