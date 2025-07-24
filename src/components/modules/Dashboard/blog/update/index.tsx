"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import "react-quill-new/dist/quill.snow.css";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/shared/Loaders/ButtonLoader";

import { uploadToCloudinary } from "@/services/cloudinary";
import { getABlog, updateBlog } from "@/services/blog";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const UpdateManagement = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getABlog(id);
        if (res?.success && res?.data) {
          setTitle(res.data.title);
          setValue(res.data.details);
          setImageUrl(res.data.image);
        } else {
          toast.error("Blog not found");
        }
      } catch (err) {
        toast.error("Failed to load blog data");
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handlePostBlog = async () => {
    if (title.trim() === "") {
      toast.error("Please Input Title");
      return;
    }

    if (value.trim() === "") {
      toast.error("Please Input Details");
      return;
    }

    setLoading(true);

    try {
      let imageToUpload = imageUrl;

      if (image) {
        imageToUpload = await uploadToCloudinary(image);
      }

      const data = {
        title,
        details: value,
        image: imageToUpload,
      };

      const res = await updateBlog(id, data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/dashboard/blog");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 mt-4 md:mt-6">
      <div className="space-y-6 max-h-[80vh] overflow-y-auto border p-4 rounded-md">
        <Input
          type="text"
          placeholder="Enter blog title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
          className="block"
        />

        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          placeholder="Write your blog content here..."
          className="min-h-[100px] bg-white"
        />

        <div className="pt-6">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <div className="p-4 border rounded bg-white space-y-2 text-gray-800 prose max-w-none">
            <h1 className="text-2xl font-bold">{title}</h1>
            {(image || imageUrl) && (
              <Image
                width={400}
                height={400}
                src={image ? URL.createObjectURL(image) : imageUrl!}
                alt="Preview"
                className="w-full max-h-[300px] object-cover rounded"
                priority
              />
            )}
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        </div>
      </div>
      <div className="text-right">
        <Button disabled={loading} onClick={handlePostBlog}>
          Update Blog {loading && <ButtonLoader />}
        </Button>
      </div>
    </div>
  );
};

export default UpdateManagement;
