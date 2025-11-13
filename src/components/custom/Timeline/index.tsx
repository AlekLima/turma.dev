"use client"

import { suseMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LeftCircleProps, TimelineItemProps, YearButtonProps } from "./types";
import { useState } from "react";

export default function Timeline({ years }: TimelineItemProps) {
  const [selectedYear, setSelectedYear] = useState<number | null>(
    years && years.length > 0 ? years[0] : null
  );

  function changeSelectedYear(yearSelected: number) {
    setSelectedYear(yearSelected);
  }

  return (
    <ScrollArea className="z-1 timeline-container scroll-area flex flex-col max-h-[290px] ">
      {years.map((year) => (
        <YearButton
          key={year}
          year={year}
          isSelected={year === selectedYear}
          onClick={changeSelectedYear} />
      ))}
    </ScrollArea>
  );
}

function YearButton({ year, isSelected = false, onClick }: YearButtonProps) {
  const selectedStyle = "bg-accent-50 border-r-[3px] border-r-zinc-900 -translate-x-[10px]";
  const selectedButtonStyle = "bg-accent-50";

  function handleOnSelectedYear(year: number) {
    onClick(year)
  }

  return (
    <div className={cn("flex items-center mr-[12px] translate-x-[10px]", isSelected && selectedStyle)}>
      <LeftCircle isVisible={isSelected} />
      <Button
        variant="ghost"
        key={year}
        onClick={() => handleOnSelectedYear(year)}
        className={
          cn("pr-[8px] rounded-none border-zinc-100 border-l-[3px] cursor-pointer",
            isSelected && selectedButtonStyle
          )
        }
      >
        <span className={`text-[18px] ${suseMono.variable}`}>{year}</span>
      </Button>
    </div>
  );
}

function LeftCircle({ isVisible }: LeftCircleProps) {
  return (
    <div className={
      cn("relative -right-[12px] z-[999] flex items-center justify-center w-5 h-5",
        !isVisible && "hidden"
      )
    }>
      <div className="absolute w-2 h-2 rounded-full bg-primary"></div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-primary"></div>
    </div>
  )
}