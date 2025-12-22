import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/providers/Providers';
import { Toaster } from 'sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Blood For BD',
  description:
    'Blood For BD একটি রক্তদাতা সংযোগকারী প্ল্যাটফর্ম, যেখানে আপনি রক্ত দান করতে বা প্রয়োজনে রক্ত সংগ্রহ করতে পারেন। জীবন বাঁচান, রক্ত দিন!',
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
        <Toaster richColors position="top-center" />
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId={process.env.GOOGLE_MEASUREMENT_ID!} />
      </body>
    </html>
  );
}
