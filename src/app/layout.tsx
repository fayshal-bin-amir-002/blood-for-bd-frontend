import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Blood For BD",
    template: "%s | Blood For BD",
  },
  description:
    "Blood For BD একটি রক্তদাতা সংযোগকারী প্ল্যাটফর্ম, যেখানে আপনি রক্ত দান করতে বা প্রয়োজনে রক্ত সংগ্রহ করতে পারেন। জীবন বাঁচান, রক্ত দিন!",
  keywords: [
    "রক্তদান",
    "Blood Donation BD",
    "Donor BD",
    "Blood For Bangladesh",
    "Donate Blood",
    "রক্তদাতা",
    "Blood Request",
    "Urgent Blood",
    "BD Donors",
    "Save Lives",
  ],
  openGraph: {
    title: "Blood For BD - রক্ত দিন, জীবন বাঁচান",
    description:
      "রক্তদান একটি মহৎ কাজ। রক্তদাতাদের সাথে রক্তপ্রার্থীদের সংযোগ করার জন্য Blood For BD। এখনই রেজিস্ট্রেশন করুন!",
    // url: "https://bloodforbd.com",
    siteName: "Blood For BD",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blood For BD - রক্ত দিন, জীবন বাঁচান",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood For BD",
    description:
      "রক্তদান করুন, জীবন বাঁচান। রক্তদাতাদের সংযোগের জন্য একটি আধুনিক প্ল্যাটফর্ম।",
    images: ["/og-image.jpg"],
  },
  // metadataBase: new URL("https://bloodforbd.com")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
