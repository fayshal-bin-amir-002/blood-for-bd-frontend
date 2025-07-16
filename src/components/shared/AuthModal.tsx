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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "../modules/Auth/LoginForm";
import RegisterForm from "../modules/Auth/RegisterForm";

function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen } = useUser();
  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent
        forceMount
        onCloseAutoFocus={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="rounded-lg"
      >
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Welcome! Login or Register
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm mt-1">
            Please fill in the form below to log in to your account or create a
            new one.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="pt-6">
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
      </DialogContent>
    </Dialog>
  );
}

export { AuthModal };
