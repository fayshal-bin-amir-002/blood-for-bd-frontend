"use client";

import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import SectionContainer from "@/components/shared/SectionContainer";
import { testimonials } from "@/constants";
import { Button } from "@/components/ui/button";

export const ExperienceSection = () => {
  return (
    <SectionContainer>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        সবার অভিজ্ঞতা ও গল্প
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Testimonials */}
        <div className="md:w-3/4 w-full">
          <TestimonialsSection testimonials={testimonials} />
        </div>

        {/* Right: Experience Card */}
        <div className="md:w-1/4 w-full">
          <div className="bg-primary/5 border border-primary/10 shadow-lg p-6 rounded-2xl h-full flex flex-col justify-between text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                আপনার গল্প শেয়ার করুন
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                আপনি কিভাবে রক্ত দিয়েছেন বা পেয়েছেন—
                <br className="hidden md:block" />
                সেই অভিজ্ঞতা আমাদের জানাতে পারেন।
              </p>
            </div>
            <div className="mt-6">
              <Button className="w-full">✍️ অভিজ্ঞতা যুক্ত করুন</Button>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
