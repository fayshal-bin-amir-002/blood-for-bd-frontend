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

export const ShuffleHero = ({ squareData }: { squareData: IGallery[] }) => {
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
      <ShuffleGrid squareData={squareData} />
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

const ShuffleGrid = ({ squareData }: { squareData: IGallery[] }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState(() => generateSquares(squareData));

  useEffect(() => {
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
  }, [squareData]);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[350px] md:h-[400px] lg:h-[450px] gap-1">
      {squares}
    </div>
  );
};

const formSchema = z.object({
  name: z.string().min(1).min(1).optional(),
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
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FileUpload files={files} setFiles={setFiles} />
              <div className="flex justify-end items-center gap-4 pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
