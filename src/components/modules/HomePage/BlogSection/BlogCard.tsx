import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { IBlog } from "@/types";

const BlogCard = ({ blog }: { blog: IBlog }) => {
  return (
    <Card
      key={blog.id}
      className="overflow-hidden shadow-sm hover:shadow-md transition py-0"
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
        <div
          className="text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: blog.details }}
        />
        <Link
          href={`/blog/${blog.id}`}
          className="mt-3 inline-block text-red-600 font-medium hover:underline"
        >
          আরও পড়ুন →
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
