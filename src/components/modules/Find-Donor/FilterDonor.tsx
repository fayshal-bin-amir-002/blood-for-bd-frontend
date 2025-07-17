"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import areaData from "../../../../area.json";
import { mapToValueLabel } from "@/helpers/mapToValueLabel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

import { bloodGroupOptions } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  division: z.string().trim().optional(),
  district: z.string().trim().optional(),
  sub_district: z.string().trim().optional(),
  blood_group: z.string().trim().optional(),
});

const FilterDonor = () => {
  const searchParams = useSearchParams();

  const [division, setDivision] = useState(searchParams.get("division") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [sub_district, setSub_district] = useState(
    searchParams.get("sub_district") || ""
  );

  const router = useRouter();
  const pathname = usePathname();
  const dBlood_group = searchParams.get("blood_group") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      division: division,
      district: district,
      sub_district: sub_district,
      blood_group: dBlood_group,
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="bg-gray-50/50 p-4 md:p-6 rounded-2xl shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mx-auto">
          {/* main working div */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {/* Input Fields */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
              {/* Blood Group */}
              <FormField
                control={form.control}
                name="blood_group"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field?.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select blood group" />
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
                          <SelectValue placeholder="Select Division" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Division</SelectLabel>
                          <SelectItem key={"all"} value={"all"}>
                            All Division
                          </SelectItem>
                          {divisionOptions?.map((division) => (
                            <SelectItem
                              key={division.value}
                              value={division.value}
                            >
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
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select District</SelectLabel>
                          <SelectItem key={"all"} value={"all"}>
                            All District
                          </SelectItem>
                          {districtOptions?.map((district) => (
                            <SelectItem
                              key={district.value}
                              value={district.value}
                            >
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
                          <SelectValue placeholder="Select Sub District" />
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

              {/* Submit Button */}
              <div className="w-full md:col-span-2 lg:col-auto flex items-end">
                <Button type="submit" className="w-full">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default FilterDonor;
