'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import areaData from '../../../../area.json';
import { mapToValueLabel } from '@/helpers/mapToValueLabel';
import { useUser } from '@/context/UserContext';
import { getDonorProfile, updateDonorLocation } from '@/services/donor';

import { Button } from '@/components/ui/button';
import ButtonLoader from '@/components/shared/Loaders/ButtonLoader';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { IDonor } from '@/types';

const formSchema = z.object({
  address: z.string().trim().min(1, 'Address is required'),
  division: z.string().trim().min(1, 'Division is required'),
  district: z.string().trim().min(1, 'District is required'),
  sub_district: z.string().trim().min(1, 'Sub-district is required'),
});

const UpdateLocation = () => {
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const [donor, setDonor] = useState<IDonor | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      division: '',
      district: '',
      sub_district: '',
    },
  });

  const refetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getDonorProfile();
      if (res?.success) {
        setDonor(res?.data);
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error('Failed to fetch profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchProfile();
  }, []);

  const divisions = areaData?.data?.map((d) => d.division);
  const divisionOptions = mapToValueLabel(divisions);
  const districts = areaData?.data?.find(
    (d) => d.division === division
  )?.districts;
  const districtOptions = mapToValueLabel(districts, 'district', 'district');
  const subDistricts = districts?.find(
    (d) => d.district === district
  )?.upazilla;
  const subDistrictOptions = mapToValueLabel(subDistricts);

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateDonorLocation(values);
      if (res?.success) {
        form.reset();
        toast.success(res?.message);
        await refetchProfile();
      } else {
        toast.error(res?.message);
        res?.errorSources?.forEach((e: any) => toast.error(e.message));
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            'space-y-8 w-full mx-auto p-6 md:p-8 lg:p-10 bg-gray-50 rounded-2xl shadow-md',
            loading && 'pointer-events-none opacity-50'
          )}
        >
          <div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-sm font-medium text-gray-500">
                  Current Location
                </span>
              </div>
            </div>
            {donor && (
              <p className="text-center text-black/80 mt-2 bg-gray-200 w-fit mx-auto py-1 px-2 rounded-md">
                {donor?.address} - {donor?.sub_district}, {donor?.district},{' '}
                {donor?.division}
              </p>
            )}
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
                      value={field?.value || ''}
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
                      value={field?.value || ''}
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
                      value={field?.value || ''}
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
                        value={field?.value || ''}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="text-right">
            <Button type="submit" disabled={isSubmitting || !user?.isDonor}>
              Update Location {isSubmitting && <ButtonLoader />}
            </Button>
          </div>
        </form>
      </Form>

      {loading && (
        <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl">
          <div className="text-center flex justify-center items-center gap-2">
            <ButtonLoader />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Loading your Location...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateLocation;
