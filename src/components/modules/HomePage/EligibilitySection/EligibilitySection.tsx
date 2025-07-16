"use client";

import SectionContainer from "@/components/shared/SectionContainer";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CalendarCheck, Heart, Smile, Weight } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function EligibilitySection() {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    lastDonation: "",
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkEligibility = () => {
    const age = parseInt(form.age);
    const weight = parseInt(form.weight);
    const lastDonation = parseInt(form.lastDonation);

    if (isNaN(age) || isNaN(weight) || isNaN(lastDonation)) {
      setResult("Please fill in all the fields correctly.");
      return;
    }

    if (age < 18 || age > 60) {
      setResult("You are not eligible: Age must be between 18 and 60.");
    } else if (weight < 50) {
      setResult("You are not eligible: Weight must be at least 50kg.");
    } else if (lastDonation < 3) {
      setResult(
        "You are not eligible: Must wait at least 3 months since last donation."
      );
    } else {
      setResult("✅ You are eligible to donate blood!");
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-950">
      <SectionContainer>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          রক্তদানের উপযুক্ততা যাচাই করুন
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Form Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Eligibility Checker</CardTitle>
              <CardDescription>
                Fill in your information to check if you’re eligible to donate
                blood.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  type="number"
                  name="age"
                  id="age"
                  value={form.age}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  name="weight"
                  id="weight"
                  value={form.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastDonation">Months since last donation</Label>
                <Input
                  type="number"
                  name="lastDonation"
                  id="lastDonation"
                  value={form.lastDonation}
                  onChange={handleChange}
                />
              </div>

              <Button className="w-full" onClick={checkEligibility}>
                Check Eligibility
              </Button>

              {result && (
                <p className="text-center font-medium text-muted-foreground">
                  {result}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Right: Info Card */}
          <Card className="bg-gray-50 dark:bg-neutral-900 text-center shadow-lg">
            <CardHeader className="flex flex-col items-center gap-2">
              <Heart className="w-10 h-10 text-red-600" />
              <CardTitle className="text-xl text-center">
                রক্তদানের ন্যূনতম শর্তাবলী
              </CardTitle>
              <CardDescription>
                বয়স ১৮-৬০, ওজন ৫০ কেজি+, ও সর্বশেষ রক্তদানের 3 মাস অতিবাহিত হতে
                হবে।
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4 text-sm leading-relaxed text-muted-foreground">
              এই তথ্যগুলো শুধুমাত্র সাধারণ নির্দেশনা হিসেবে দেওয়া হয়েছে। আপনার
              শারীরিক অবস্থা সম্পর্কে নিশ্চিত হতে প্রয়োজনে ডাক্তারের পরামর্শ
              নিন।
            </CardContent>
          </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
