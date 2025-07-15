"use client";

import Image from "next/image";
import SectionContainer from "@/components/shared/SectionContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqImage from "@/assets/faq/faq.jpg";

const faqs = [
  {
    question: "রক্তদান করলে কি শরীরে কোন সমস্যা হয়?",
    answer:
      "না, একটি সুস্থ ব্যক্তি নিরাপদভাবে রক্ত দিতে পারেন এবং শরীর তা দ্রুতই পূরণ করে নেয়। রক্তদানের পর বিশ্রাম ও সঠিক খাবার গ্রহণ করলে কোনো ক্ষতি হয় না।",
  },
  {
    question: "কতদিন পর পর রক্ত দেওয়া যায়?",
    answer:
      "পুরুষরা প্রতি ৪ মাসে একবার এবং নারীরা প্রতি ৬ মাসে একবার রক্ত দিতে পারেন।",
  },
  {
    question: "রক্তদানের জন্য কি শারীরিক যোগ্যতা লাগে?",
    answer:
      "হ্যাঁ, বয়স ১৮-৬০ এর মধ্যে হতে হবে, ওজন ৫০ কেজি বা তার বেশি এবং সুস্থ থাকতে হবে।",
  },
  {
    question: "রক্তদানের পর কী কী খেতে হবে?",
    answer:
      "রক্তদানের পর প্রচুর পানি, ফলমূল ও আয়রন সমৃদ্ধ খাবার খেতে হয়, যেন শরীর দ্রুত রক্ত পূরণ করতে পারে।",
  },
  {
    question: "রক্তদানের সময় কি ব্যথা লাগে?",
    answer:
      "না, কেবল সূচ ঢুকানোর সময় সামান্য ব্যথা অনুভব হতে পারে। তবে এটি খুবই সামান্য এবং সহনীয়।",
  },
  {
    question: "রক্তদানের আগে কী খাওয়া উচিত?",
    answer:
      "রক্তদানের আগে হালকা খাবার খাওয়া ভালো এবং প্রচুর পানি পান করতে হয়। খালি পেটে রক্তদান করা উচিত নয়।",
  },
  {
    question: "আমি কিভাবে একজন নিয়মিত রক্তদাতা হতে পারি?",
    answer:
      "আপনি প্রতি ৪-৬ মাস পরপর রক্তদান করতে পারেন এবং কোনো রক্তদানের সংগঠনের সাথে যুক্ত হয়ে নিয়মিত রক্তদান করতে পারেন।",
  },
];

export const FAQSection = () => {
  return (
    <SectionContainer>
      <div className="bg-gray-50 p-4 md:p-6 lg:p-8 rounded-xl shadow">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          সাধারণ প্রশ্নোত্তর
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Accordion Left Side */}
          <Accordion className="w-full space-y-2" type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Image Right Side */}
          <div className="w-full">
            <Image
              src={faqImage}
              alt="FAQ illustration"
              className="rounded-xl shadow-md"
              width={600}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
