"use client";

import { Button } from "@/components/ui/button";
import { MarqueeAnimation } from "./MarqueeAnimation";

const UpperNavBar = () => {
  return (
    <div className="bg-black text-white px-2 py-1 text-sm font-medium">
      <div className="flex flex-row justify-between items-center gap-4 overflow-hidden">
        <div className="flex-1 overflow-hidden relative min-w-0">
          <MarqueeAnimation direction="left" baseVelocity={-1}>
            🩸 রক্ত দিন, জীবন বাঁচান — এখনই নিবন্ধন করুন এবং একজন বীর হন! 🕒
            প্রতি ৪ মাসে একবার রক্তদান করা নিরাপদ। ❤️ আপনার ১ ব্যাগ রক্ত ৩টি
            জীবন বাঁচাতে পারে। 📞 রক্তদানের জন্য আমাদের সাথে যোগাযোগ করুন এখনই!
          </MarqueeAnimation>
        </div>
        <div className="shrink-0">
          <Button>Join as a Donor</Button>
        </div>
      </div>
    </div>
  );
};

export default UpperNavBar;
