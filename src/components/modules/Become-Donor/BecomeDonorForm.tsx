"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { bloodGroupOptions } from "@/constants";
import areaData from "../../../../area.json";
import { mapToValueLabel } from "@/helpers/mapToValueLabel";
import { useState } from "react";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { createDonor } from "@/services/donor";

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z.string().trim().min(1, "Address is required"),
  contact_number: z
    .string()
    .trim()
    .regex(/^\d{11}$/, {
      message: "Contact number must be exactly 11 digits.",
    }),
  division: z.string().trim().min(1, "Division is required"),
  district: z.string().trim().min(1, "District is required"),
  sub_district: z.string().trim().min(1, "Sub-district is required"),
  blood_group: z.string().trim().min(1, "Blood Group is required"),
  last_donation_date: z.date().optional(),
});

const BecomeDonorForm = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const { refreshUser, user } = useUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      contact_number: "",
      division: "",
      district: "",
      sub_district: "",
      blood_group: "",
    },
  });
  const divisions = areaData?.data?.map((division) => division.division);
  const divisionOptions = mapToValueLabel(divisions);

  const districts = areaData?.data?.find(
    (divisions) => divisions.division === division
  )?.districts;
  const districtOptions = mapToValueLabel(districts, "district", "district");

  const subDistricts = districts?.find(
    (districts) => districts.district === district
  )?.upazilla;
  const subDistrictOptions = mapToValueLabel(subDistricts);

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createDonor(values);
      await refreshUser();
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(res?.message);
        if (res?.errorSources && res?.errorSources?.length > 0) {
          res?.errorSources?.map((e: any) => toast.error(e.message));
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="bg-gray-50 lg:p-6 rounded-2xl shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full mx-auto p-6 md:p-8 lg:p-10"
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-sm font-medium text-gray-500">
                Current Location
              </span>
            </div>
          </div>

          {/* division & district */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="division"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Division</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setDivision(value);
                      }}
                      defaultValue={field.value}
                      value={field?.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {divisionOptions?.map((division) => (
                          <SelectItem
                            key={division.value}
                            value={division.value}
                          >
                            {division.label}
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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setDistrict(value);
                      }}
                      defaultValue={field.value}
                      value={field?.value || ""}
                      disabled={!division}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your District" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districtOptions?.map((district) => (
                          <SelectItem
                            key={district.value}
                            value={district.value}
                          >
                            {district.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* sub district & address */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            <div className="md:col-span-6 col-span-12">
              <FormField
                control={form.control}
                name="sub_district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub District</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field?.value || ""}
                      disabled={!district || !division}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Sub District" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subDistrictOptions?.map((sub) => (
                          <SelectItem key={sub.value} value={sub.value}>
                            {sub.label}
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
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

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting || user?.isDonor}>
              Become a Donor {isSubmitting && <ButtonLoader />}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BecomeDonorForm;
