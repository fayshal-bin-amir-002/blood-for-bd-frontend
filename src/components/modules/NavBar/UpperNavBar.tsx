"use client";

import { Button } from "@/components/ui/button";
import { MarqueeAnimation } from "./MarqueeAnimation";
import Container from "@/components/shared/Container";

const UpperNavBar = () => {
  return (
    <div className="bg-black text-white py-2 text-sm font-medium">
      <Container>
        <div className="flex flex-row justify-between items-center gap-4 overflow-hidden">
          <div className="flex-1 overflow-hidden relative w-full">
            <MarqueeAnimation direction="left" baseVelocity={-1}>
              🩸 রক্ত দিন, জীবন বাঁচান — এখনই নিবন্ধন করুন এবং একজন বীর হন! 🕒
              প্রতি ৪ মাসে একবার রক্তদান করা নিরাপদ। ❤️ আপনার ১ ব্যাগ রক্ত ৩টি
              জীবন বাঁচাতে পারে। 📞 রক্তদানের জন্য আমাদের সাথে যোগাযোগ করুন
              এখনই!
            </MarqueeAnimation>
          </div>
          <div className="shrink-0">
            <Button>Join as a Donor</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpperNavBar;
