import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBlog } from "@/types";
import Image from "next/image";

interface IBlogProps {
  openView: boolean;
  setOpenView: (b: boolean) => void;
  blog: IBlog | null;
}

const ViewBlogModal = ({ blog, openView, setOpenView }: IBlogProps) => {
  return (
    <Dialog onOpenChange={setOpenView} open={openView}>
      <DialogContent className=" max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {blog && (
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl font-medium">{blog?.title}</h3>
              <Image
                src={blog?.image}
                width={500}
                height={400}
                alt={blog?.title}
                priority
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: blog?.details }} />
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewBlogModal;
