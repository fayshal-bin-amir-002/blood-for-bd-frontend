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
import { ITestimonial } from "@/types/testimonial";

interface ITestimonialProps {
  openView: boolean;
  setOpenView: (b: boolean) => void;
  item: ITestimonial | null;
}

const ViewTestimonialModal = ({
  item,
  openView,
  setOpenView,
}: ITestimonialProps) => {
  return (
    <Dialog onOpenChange={setOpenView} open={openView}>
      <DialogContent className=" max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {item && (
          <div className="space-y-3 md:space-y-4">
            <p>Name: {item?.name}</p>
            <p>Address: {item?.address}</p>
            <p>Message: {item?.message}</p>
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

export default ViewTestimonialModal;
