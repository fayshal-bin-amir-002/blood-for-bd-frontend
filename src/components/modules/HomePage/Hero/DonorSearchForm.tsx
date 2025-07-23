"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { bloodGroupOptions } from "@/constants";
import areaData from "../../../../../area.json";
import { mapToValueLabel } from "@/helpers/mapToValueLabel";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  blood_group: z.string().optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  sub_district: z.string().optional(),
});

const DonorSearchForm = () => {
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [sub_district, setSub_district] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams();
    const blood_group = values.blood_group?.trim();

    // Handle blood group
    if (blood_group && blood_group !== "all") {
      params.set("blood_group", blood_group);
    }

    // Handle division logic
    if (division && division !== "all") {
      params.set("division", division);

      if (district && district !== "all") {
        params.set("district", district);

        if (sub_district && sub_district !== "all") {
          params.set("sub_district", sub_district);
        }
      }
    }

    router.push(`/find-donor?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Blood Group */}
          <FormField
            control={form.control}
            name="blood_group"
            render={({ field }: { field: any }) => (
              <FormItem className="w-full">
                <FormLabel>Blood Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field?.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Blood Group</SelectLabel>
                      <SelectItem key={"all"} value={"all"}>
                        All Blood Group
                      </SelectItem>
                      {bloodGroupOptions?.map((bg) => (
                        <SelectItem key={bg.value} value={bg.value}>
                          {bg.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Division */}
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
                    setDistrict("");
                    setSub_district("");
                  }}
                  defaultValue={field.value}
                  value={field?.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Division</SelectLabel>
                      <SelectItem key={"all"} value={"all"}>
                        All Division
                      </SelectItem>
                      {divisionOptions?.map((division) => (
                        <SelectItem key={division.value} value={division.value}>
                          {division.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District */}
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
                    setSub_district("");
                  }}
                  defaultValue={field.value}
                  value={field?.value || ""}
                  disabled={!division || division === "all"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select District</SelectLabel>
                      <SelectItem key={"all"} value={"all"}>
                        All District
                      </SelectItem>
                      {districtOptions?.map((district) => (
                        <SelectItem key={district.value} value={district.value}>
                          {district.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub District */}
          <FormField
            control={form.control}
            name="sub_district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub District</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSub_district(value);
                  }}
                  defaultValue={field.value}
                  value={field?.value || ""}
                  disabled={
                    !district ||
                    district === "all" ||
                    !division ||
                    division === "all"
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Sub District</SelectLabel>
                      <SelectItem key={"all"} value={"all"}>
                        All Sub District
                      </SelectItem>
                      {subDistrictOptions?.map((sub) => (
                        <SelectItem key={sub.value} value={sub.value}>
                          {sub.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default DonorSearchForm;
