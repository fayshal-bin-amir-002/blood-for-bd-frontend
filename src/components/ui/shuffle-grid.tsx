"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IGallery } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FileUpload from "./file-upload";
import { postToGallery } from "@/services/gallery";
import { uploadToCloudinary } from "@/services/cloudinary";
import ButtonLoader from "../shared/Loaders/ButtonLoader";

export const ShuffleHero = ({
  squareData,
  loading,
}: {
  squareData: IGallery[];
  loading: boolean;
}) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-primary font-medium">
          প্রতিটি ছবি এক একটি গল্প
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
          রক্তদানের মুহূর্ত শেয়ার করুন
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
          আপনি যখন রক্ত দান করেন, তখন আপনি শুধু রক্তই দেন না—আপনি জীবন দেন।
          আপনার ছবি অন্যদের অনুপ্রাণিত করতে পারে আজই রক্তদাতা হতে।
        </p>
        <GalleryImagePostDialog />
      </div>
      {/* Pass squareData here */}
      <ShuffleGrid squareData={squareData} loading={loading} />
    </section>
  );
};

const shuffle = (array: IGallery[]) => {
  let currentIndex = array.length,
    randomIndex;

  // Make a copy so original array is not mutated
  const newArray = [...array];

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[currentIndex],
    ];
  }

  return newArray;
};

const generateSquares = (squareData: IGallery[]) => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-muted"
      suppressHydrationWarning
      style={{
        backgroundImage: `url(${sq.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      title={sq.name}
    ></motion.div>
  ));
};

const ShuffleGrid = ({
  squareData,
  loading,
}: {
  squareData: IGallery[];
  loading: boolean;
}) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(() =>
    loading ? [] : generateSquares(squareData)
  );

  useEffect(() => {
    if (loading) return;

    const shuffleSquares = () => {
      setSquares(generateSquares(squareData));
      timeoutRef.current = setTimeout(shuffleSquares, 5000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [squareData, loading]);

  const loadingSquares = Array.from({ length: 16 }).map((_, index) => (
    <div
      key={`loading-${index}`}
      className="w-full h-full rounded-md bg-muted animate-pulse"
    ></div>
  ));

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[350px] md:h-[400px] lg:h-[450px] gap-1">
      {loading ? loadingSquares : squares}
    </div>
  );
};

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
});

export interface FileWithPreview {
  id: string;
  preview: string;
  progress: number;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  file?: File;
}

const GalleryImagePostDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (files?.length === 0) {
      toast.error("Please select a Image");
      return;
    }
    setIsLoading(true);
    try {
      const image = await uploadToCloudinary(files[0]?.file as File);
      const galleryData = {
        ...values,
        image,
      };

      const res = await postToGallery(galleryData);
      if (res?.success) {
        toast.success(res?.message);
        form.reset();
        setFiles([]);
        setIsOpen(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>📤 ছবি আপলোড করুন</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] rounded-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>রক্তদান ছবি আপলোড করুন</DialogTitle>
          <DialogDescription>
            আপনার রক্তদান মুহূর্তের ছবি শেয়ার করুন, অন্যদের অনুপ্রাণিত করতে
            সাহায্য করুন। ছবি আপলোড করার মাধ্যমে আপনি রক্তদানের প্রচারণায়
            অংশগ্রহণ করবেন।
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-3xl mx-auto"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type Full Name..."
                        type="text"
                        {...field}
                        value={field?.value || ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileUpload files={files} setFiles={setFiles} />
              <div className="flex justify-end items-center gap-4 pt-4">
                <DialogClose asChild>
                  <Button onClick={() => form.reset()} variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoading}>
                  Submit {isLoading && <ButtonLoader />}{" "}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
