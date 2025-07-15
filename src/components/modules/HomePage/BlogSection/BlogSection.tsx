"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import SectionContainer from "@/components/shared/SectionContainer";
import { IBlog } from "@/types";
import { Button } from "@/components/ui/button";

const mockBlogs: IBlog[] = [
  {
    id: "1",
    title: "রক্তদানের উপকারিতা এবং প্রয়োজনীয়তা",
    image:
      "https://www.dainikbangla.com.bd/images/db/2024/02/20/atajabajahibr.jpg",
    details:
      "রক্তদান শুধু একজনের জীবন বাঁচায় না, এটি আপনার শরীরের জন্যও উপকারী।",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "রক্তদানে ভয় কেন? মিথ এবং সত্য",
    image:
      "https://www.dainikbangla.com.bd/images/db/2024/02/20/atajabajahibr.jpg",
    details: "অনেকে মনে করেন রক্তদান শরীর দুর্বল করে – এই ধারণা কতটা সত্য?",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "রক্তদানের আগে ও পরে করণীয়",
    image:
      "https://www.dainikbangla.com.bd/images/db/2024/02/20/atajabajahibr.jpg",
    details: "রক্তদানের আগে ও পরে কী খাবেন, কী করবেন না—জানুন বিস্তারিত।",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const BlogSection = () => {
  return (
    <div className="bg-white">
      <SectionContainer>
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            সাম্প্রতিক ব্লগ
          </h2>
          <p className="text-gray-700 mt-2">
            রক্তদানের গুরুত্ব ও তথ্যভিত্তিক ব্লগ পড়ুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden shadow-sm hover:shadow-md transition pt-0"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={300}
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <p className="text-xs text-gray-500 mb-1">
                  {format(new Date(blog.createdAt), "dd MMM yyyy")}
                </p>
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.details}
                </p>
                <Link
                  href={`/blog/${blog.id}`}
                  className="mt-3 inline-block text-red-600 text-sm font-medium hover:underline"
                >
                  আরও পড়ুন →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pt-6 md:pt-8 text-center">
          <Link href="/blog">
            <Button>আরও ব্লগ পড়ুন →</Button>
          </Link>
        </div>
      </SectionContainer>
    </div>
  );
};

export default BlogSection;
