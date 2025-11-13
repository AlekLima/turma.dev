"use client"

import { suseMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LeftCircleProps, TimelineItemProps, YearButtonProps } from "./types";
import { useEffect, useState } from "react";

export default function Timeline({ years }: TimelineItemProps) {
  const [blackBorderYTranslation, setBlackBorderYTranslation] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number | null>(
    years && years.length > 0 ? years[0] : null
  );

  function changeSelectedYear(yearSelected: number) {
    setSelectedYear(yearSelected);
  }

  // Atualiza a tradução Y da barra quando selectedYear mudar
  useEffect(() => {
    if (selectedYear == null) {
      setBlackBorderYTranslation(0);
      return;
    }
    const idx = years.indexOf(selectedYear);
    const clampedIndex = idx >= 0 ? idx : 0;
    setBlackBorderYTranslation(clampedIndex * 36);
  }, [selectedYear, years]);

  return (
    <div className="timeline-container flex">
      <ScrollArea className="z-1 scroll-area flex flex-col max-h-[290px] ">
        {years.map((year) => (
          <YearButton
            key={year}
            year={year}
            isSelected={year === selectedYear}
            onClick={changeSelectedYear}
          />
        ))}
      </ScrollArea>
      <div
        className="z-2 h-[36px] w-[3px] bg-zinc-900 -translate-x-[20px] text-transparent"
        style={{ transform: `translateY(${blackBorderYTranslation}px)` }}
      >
        a
      </div>
    </div>
  );
}

function YearButton({ year, isSelected = false, onClick }: YearButtonProps) {
  const selectedStyle = "bg-accent-50";
  const selectedButtonStyle = "bg-accent-50";

  function handleOnSelectedYear(year: number) {
    onClick(year)
  }

  return (
    <div
      className={cn(
        "flex items-center mr-[12px] -translate-x-[10px]",
        isSelected && selectedStyle
      )}
    >
      <LeftCircle isVisible={isSelected} />
      <Button
        variant="ghost"
        key={year}
        onClick={() => handleOnSelectedYear(year)}
        aria-pressed={isSelected}
        className={cn(
          "pr-[8px] rounded-none border-zinc-100 border-l-[3px] cursor-pointer",
          isSelected && selectedButtonStyle
        )}
      >
        <span className={`text-[18px] ${suseMono.variable}`}>{year}</span>
      </Button>
    </div>
  );
}

function LeftCircle({ isVisible }: LeftCircleProps) {
  return (
    <div
      className={cn(
        "relative -right-[12px] z-[999] flex items-center justify-center w-5 h-5 transform-gpu transition-all duration-200 ease-out",
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    >
      <div className="absolute w-2 h-2 rounded-full bg-primary"></div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-primary"></div>
    </div>
  );
}