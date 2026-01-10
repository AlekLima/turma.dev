"use client"

import { suseMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LeftCircleProps, TimelineItemProps, YearButtonProps } from "./types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBackground } from "../../../contexts/BackgroundContext";

export default function Timeline({ years }: TimelineItemProps) {
  const [blackBorderYTranslation, setBlackBorderYTranslation] = useState(0);
  const { selectedYear, setSelectedYear } = useBackground();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [showBar, setShowBar] = useState(true);

  const changeSelectedYear = useCallback((yearSelected: number) => {
    setSelectedYear(yearSelected);
  }, [setSelectedYear]);

  function calculateBlackBorderTranslation(selectedYear: number | null, years: number[]) {
    const yearHeight = 36

    if (selectedYear == null) return 0;
    const idx = years.indexOf(selectedYear);
    return Math.max(0, idx) * yearHeight;
  }

  const updateBarVisibility = useCallback(() => {
    if (viewportRef.current && selectedYear != null) {
      const vp = viewportRef.current.getBoundingClientRect();
      const item = itemRefs.current[selectedYear];
      if (item) {
        const it = item.getBoundingClientRect();
        const isVisible = it.bottom > vp.top && it.top < vp.bottom;
        setShowBar(isVisible);
      } else {
        setShowBar(false);
      }
    } else {
      setShowBar(false);
    }
  }, [selectedYear]);

  function handleViewportScroll() {
    const base = calculateBlackBorderTranslation(selectedYear, years);
    const scrollTop = viewportRef.current ? viewportRef.current.scrollTop : 0;
    setBlackBorderYTranslation(Math.max(0, base - scrollTop));

    // Update visibility when scrolling
    updateBarVisibility();
  }

  useEffect(() => {
    const base = calculateBlackBorderTranslation(selectedYear, years);
    const scrollTop = viewportRef.current ? viewportRef.current.scrollTop : 0;
    // Invert scroll variation: when user scrolls down (scrollTop increases)
    // the bar should move up => subtract scrollTop from base.
    setBlackBorderYTranslation(Math.max(0, base - scrollTop));

    // Check if the selected item is visible within the viewport
    updateBarVisibility();
  }, [selectedYear, years, updateBarVisibility]);

  return (
    <div className="timeline-container flex">
      <ScrollArea
        className="z-1 scroll-area flex flex-col max-h-[290px]"
        viewportRef={viewportRef}
        onViewportScroll={handleViewportScroll}
        hideScrollbar
      >
        {years.map((year) => (
          <YearButton
            key={year}
            year={year}
            isSelected={year === selectedYear}
            onClick={changeSelectedYear}
            innerRef={(el) => (itemRefs.current[year] = el)}
          />
        ))}
      </ScrollArea>
      <div id="black-border"
        className={`z-2 h-[36px] w-[3px] bg-zinc-900 -translate-x-[16px] text-transparent ease-out transition-[transform,opacity] duration-300 ${
          showBar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ transform: `translateY(${blackBorderYTranslation}px)` }}
      >
      </div>
    </div>
  );
}

function YearButton({ year, isSelected = false, onClick, innerRef }: YearButtonProps) {
  const selectedStyle = "bg-accent-50";

  return (
    <div
      ref={(el) => innerRef?.(el)}
      className={cn(
        "flex items-center mr-[8px] -translate-x-[10px] transition-all duration-300",
        isSelected && selectedStyle
      )}
    >
      <LeftCircle isVisible={isSelected} />
      <Button
        variant="ghost"
        onClick={() => onClick(year)}
        aria-pressed={isSelected}
        className={cn(
          "pr-[8px] rounded-none border-zinc-100 border-l-[3px] cursor-pointer",
          isSelected && selectedStyle
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