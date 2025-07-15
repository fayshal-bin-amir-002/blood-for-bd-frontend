"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Mail, Phone, Linkedin } from "lucide-react";
import Container from "@/components/shared/Container";
import Image from "next/image";
import logo from "@/assets/logo/logo.png";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "রক্তদাতা হোন", href: "/become-donor" },
  { label: "ব্লগ", href: "/blog" },
];

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border text-foreground">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Description */}
          <div>
            <Link href="/" className="relative z-20">
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={30}
                priority
                style={{ objectFit: "contain" }}
                className="h-10 md:h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              এক ফোঁটা রক্ত এক জীবন — <br />
              আমাদের লক্ষ্য রক্তদাতা ও রক্তপ্রয়োজনে থাকা মানুষের মাঝে একটি
              সেতুবন্ধন তৈরি করা।
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:underline hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>📍 রংপুর, বাংলাদেশ</li>
              <li>
                📧{" "}
                <Link href="mailto:foyshalbinamir@gmail.com">
                  foyshalbinamir@gmail.com
                </Link>
              </li>
              <li>
                📞 <Link href="tel:+8801755288840">+8801755288840</Link>
              </li>
              <li>
                💬{" "}
                <Link
                  href="https://wa.me/8801755288840"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </Link>
              </li>
              <li>
                🌐{" "}
                <Link
                  href="https://fayshal-dev-portfolio.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-4">আমাদের অনুসরণ করুন</h3>
            <div className="flex gap-3 flex-wrap">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link
                  href="https://www.facebook.com/fayshal.bin.amir.02"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link
                  href="https://www.linkedin.com/in/fayshal-bin-amir"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="mailto:foyshalbinamir@gmail.com">
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href="tel:+8801755288840">
                  <Phone className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-muted/50 border-t border-border py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BloodForBD. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};
