import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/modules/Auth/LoginForm";
import RegisterForm from "@/components/modules/Auth/RegisterForm";
import { Suspense } from "react";
import SpinLoader from "@/components/shared/Loaders/SpinLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blood For BD | Auth",
  description:
    "Join our blood donation network in Bangladesh. Find donors, request blood, and help save lives with just one click. Your blood can be someone’s lifeline.",
  keywords: [
    "blood donation",
    "blood donor Bangladesh",
    "need blood BD",
    "blood group search",
    "Rangpur blood donor",
    "free blood service",
    "save lives BD",
    "donate blood BD",
    "blood bank Bangladesh",
  ],
};

const AuthPage = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center px-4 md:px-0">
      <div className="max-w-sm w-full">
        <Suspense fallback={<SpinLoader />}>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="cursor-pointer">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="cursor-pointer">
                Register
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login to Your Account</CardTitle>
                  <CardDescription>
                    Enter your phone and password to access your account.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <LoginForm />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create an Account</CardTitle>
                  <CardDescription>
                    Fill in the required information to create your account.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <RegisterForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </div>
  );
};

export default AuthPage;
