"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse, MapPinned, UserRound } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import UpdateProfileForm from "./UpdateProfileForm";
import UpdateLocation from "./UpdateLocation";

const ProfileManagement = ({
  query,
}: {
  query: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentTab =
    typeof query?.tab === "string" ? query.tab : "update-profile";

  const handleTabChange = (newTab: string) => {
    if (newTab !== currentTab) {
      const params = new URLSearchParams();
      params.set("tab", newTab);
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  return (
    <div>
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="text-muted-foreground overflow-hidden"
      >
        <TabsList variant="line" className="overflow-x-scroll">
          <TabsTrigger value="update-profile">
            <UserRound className="h-4 w-4" /> Update Profile
          </TabsTrigger>
          <TabsTrigger value="update-location">
            <MapPinned className="h-4 w-4" /> Update Location
          </TabsTrigger>
          <TabsTrigger value="blood-donations">
            <HeartPulse className="h-4 w-4" /> Blood Donations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="update-profile">
          <div className="mt-4 md:mt-6">
            <UpdateProfileForm />
          </div>
        </TabsContent>
        <TabsContent value="update-location">
          <div className="mt-4 md:mt-6">
            <UpdateLocation />
          </div>
        </TabsContent>
        <TabsContent value="blood-donations">
          <p>hello</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileManagement;
