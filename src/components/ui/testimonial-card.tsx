import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  name: string;
  address: string;
  message: string;
  className?: string;
}

export function TestimonialCard({
  name,
  address,
  message,
  className,
}: TestimonialCardProps) {
  const Card = "div";

  return (
    <Card
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">{name}</h3>
          <p className="text-sm text-muted-foreground">From: {address}</p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">{message}</p>
    </Card>
  );
}
