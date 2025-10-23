import { changaSans } from "@/app/layout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  years: number[];
};

export default function Timeline({ years }: TimelineItemProps) {

  const isSelected = true; // Placeholder logic for selected year
  const selectedStyle = "bg-accent-50";

  return (
    <ScrollArea className="z-1 timeline-container scroll-area flex flex-col max-h-[300px]  ">
      {years.map((year) => (
        <Button
          variant="ghost"
          key={year}
          className={cn("ml-[20px] overflow-visible rounded-none border-zinc-100 border-l-[3px]", isSelected && selectedStyle)}
        >
          {isSelected && (
            <div className="relative left-[-26px] z-[999] flex items-center justify-center w-5 h-5">
              <div className="absolute w-2 h-2 rounded-full bg-primary"></div>
              <div className="absolute w-4 h-4 rounded-full border-2 border-primary"></div>
            </div>
          )}
          <span className={`text-[16px] relative left-[-26px] ${changaSans.variable}`}>{year}</span>
        </Button>
      ))}
    </ScrollArea>
  );
}