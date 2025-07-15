"use client";

import { CheckCircle } from "lucide-react";
import SectionContainer from "@/components/shared/SectionContainer";
import Link from "next/link";

const steps = [
  {
    title: "ধাপ ১: অনুসন্ধান করুন",
    description:
      "নির্দিষ্ট বিভাগ, জেলা, উপজেলায় এবং রক্তের গ্রুপ অনুযায়ী রক্তদাতা খুঁজুন।",
  },
  {
    title: "ধাপ ২: দাতার সাথে মিল করুন",
    description: "উপযুক্ত রক্তদাতার সাথে মিল খুঁজুন।",
  },
  {
    title: "ধাপ ৩: যোগাযোগ বা সাক্ষাৎ করুন",
    description:
      "তার সর্বশেষ রক্তদানের তারিখ যাচাই করে যোগাযোগ করুন বা সাক্ষাৎ করুন।",
  },
  {
    title: "ধাপ ৪: রক্ত গ্রহণ করুন",
    description: "রক্তদাতার সাথে যোগাযোগ করে রক্ত গ্রহণ সম্পন্ন করুন।",
  },
];

const JoinNote = () => (
  <div className="mt-10 rounded-lg border border-red-300 bg-red-50 p-6 text-center shadow-md dark:bg-red-100/10 dark:border-red-400/40">
    <h3 className="text-lg font-semibold text-red-700 dark:text-red-300">
      👉 রক্তদাতা হতে চান?
    </h3>
    <p className="mt-2 text-sm text-red-600 dark:text-red-200">
      খুব সহজেই আপনি রক্তদাতা হিসেবে নিবন্ধন করতে পারেন — শুধুমাত্র একটি ছোট
      ফর্ম পূরণ করুন।
      <Link href="/become-donor" className="ms-1 underline font-medium">
        নিবন্ধন করুন
      </Link>
    </p>
  </div>
);

const HowItWorksSection = () => {
  return (
    <div className="bg-white dark:bg-neutral-900">
      <SectionContainer>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">
            🩸 রক্তদানের প্রক্রিয়া
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            সহজ ৪টি ধাপে জানুন কীভাবে আপনি রক্ত পেতে বা দিতে পারেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-lg transition duration-300 bg-white dark:bg-neutral-800"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="text-red-500 mt-1 w-5 h-5" />
                <div>
                  <h4 className="text-base font-semibold mb-1 text-gray-800 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <JoinNote />
      </SectionContainer>
    </div>
  );
};

export default HowItWorksSection;
