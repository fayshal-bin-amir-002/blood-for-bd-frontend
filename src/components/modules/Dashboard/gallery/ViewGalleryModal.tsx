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
import { IGallery } from "@/types";
import Image from "next/image";

interface IGalleryProps {
  openView: boolean;
  setOpenView: (b: boolean) => void;
  item: IGallery | null;
}

const ViewGalleryModal = ({ item, openView, setOpenView }: IGalleryProps) => {
  return (
    <Dialog onOpenChange={setOpenView} open={openView}>
      <DialogContent className=" max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {item && (
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-xl font-medium">{item?.name}</h3>
              <Image
                src={item?.image}
                width={500}
                height={400}
                alt={item?.name}
                className="w-full h-[300px] object-cover"
                priority
              />
            </div>
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

export default ViewGalleryModal;
