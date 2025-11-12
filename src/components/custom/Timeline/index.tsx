import { suseMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TimelineItemProps, YearButtonProps } from "./types";

export default function Timeline({ years }: TimelineItemProps) {
  return (
    <ScrollArea className="z-1 timeline-container scroll-area flex flex-col max-h-[290px]">
      {years.map((year) => (
        <YearButton key={year} year={year} />
      ))}
    </ScrollArea>
  );
}

function YearButton({ year }: YearButtonProps) {
  const isSelected = true;
  const selectedStyle = "bg-accent-50 border-r-[3px] border-r-zinc-900 mr-[12px]";
  const selectedButtonStyle = "bg-accent-50";

  return (
    <div className={cn("flex items-center", isSelected && selectedStyle)}>
      {isSelected && <LeftCircle />}
      <Button
        variant="ghost"
        key={year}
        className={cn("pr-[8px] rounded-none border-zinc-100 border-l-[3px]", isSelected && selectedButtonStyle)}
      >
        <span className={`text-[18px] ${suseMono.variable}`}>{year}</span>
      </Button>
    </div>
  );
}

function LeftCircle() {
  return (
    <div className="relative -right-[12px] z-[999] flex items-center justify-center w-5 h-5">
      <div className="absolute w-2 h-2 rounded-full bg-primary"></div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-primary"></div>
    </div>
  )
}