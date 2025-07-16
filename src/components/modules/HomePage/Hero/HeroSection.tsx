import SectionContainer from "@/components/shared/SectionContainer";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import DonorSearchForm from "./DonorSearchForm";
import Link from "next/link";
import Image from "next/image";

import hero_donor from "@/assets/hero/hero_donor.png";
import hero_be_aware from "@/assets/hero/hero_be_aware.png";

interface ColumnProps {
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

const Column = ({ title, description, className, children }: ColumnProps) => (
  <div className={cn("p-4", className)}>
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
    {children && <div className="mt-4">{children}</div>}
  </div>
);

const HeroSection = () => {
  return (
    <div className="bg-gray-50">
      <SectionContainer>
        <div className="flex flex-col items-center lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-300 dark:divide-neutral-800 py-6 md:py-8 lg:py-12">
          <div className="flex-1 md:px-4">
            <Column
              title="রক্তদাতা খুঁজুন"
              description="প্রয়োজনীয় মুহূর্তে সহজেই আপনার এলাকার রক্তদাতাকে খুঁজুন।"
            >
              <div className="border-2 border-primary/30 rounded-md shadow-lg">
                <DonorSearchForm />
              </div>
            </Column>
          </div>

          <div className="flex-1 md:px-4">
            <Column
              title="রক্তদাতা হন"
              description="আপনার রক্তে নতুন প্রাণ দিন — আজই নিবন্ধন করুন রক্তদাতা হিসেবে।"
            >
              <Link href="/become-donor">
                <Image
                  src={hero_donor}
                  alt="become-donor"
                  width={400}
                  height={400}
                  priority
                  className="h-[245px] object-fill rounded-md shadow-lg hover:scale-95 duration-300 ease-in-out"
                />
              </Link>
            </Column>
          </div>

          <div className="flex-1 md:px-4">
            <Column
              title="প্রতারক হতে সাবধান"
              description="কেউ যদি রক্তের জন্য টাকা চায়, সেটি প্রতারণা হতে পারে। যাচাই করে রক্ত দিন।"
            >
              <Image
                src={hero_be_aware}
                alt="be_aware"
                width={400}
                height={400}
                priority
                className="h-[245px] object-fill rounded-md shadow-lg"
              />
            </Column>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default HeroSection;
