"use client"

import { suseMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { LeftCircleProps, TimelineItemProps, YearButtonProps } from "./types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBackground } from "../../../contexts/BackgroundContext";
import { ChevronDownIcon, ChevronsDownIcon, ChevronsUpIcon, ChevronUpIcon } from "lucide-react";

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

  const scrollToYear = useCallback((year: number) => {
    const element = itemRefs.current[year];
    if (element && viewportRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleUpAll = useCallback(() => {
    if (years.length > 0) {
      scrollToYear(years[0]);
    }
  }, [years, scrollToYear]);

  const handleDownAll = useCallback(() => {
    if (years.length > 0) {
      scrollToYear(years[years.length - 1]);
    }
  }, [years, scrollToYear]);

  const handleUpOne = useCallback(() => {
    if (!viewportRef.current) return;
    const yearHeight = 36;
    const currentScroll = viewportRef.current.scrollTop;
    const targetScroll = Math.floor(currentScroll / yearHeight) * yearHeight;
    const scrollAmount = currentScroll - targetScroll;
    
    if (scrollAmount > 1) {
      // Align to grid first
      viewportRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      // Already aligned, go to previous
      viewportRef.current.scrollTo({ top: targetScroll - yearHeight, behavior: 'smooth' });
    }
  }, []);

  const handleDownOne = useCallback(() => {
    if (!viewportRef.current) return;
    const yearHeight = 36;
    const currentScroll = viewportRef.current.scrollTop;
    const targetScroll = Math.ceil(currentScroll / yearHeight) * yearHeight;
    const scrollAmount = targetScroll - currentScroll;
    
    if (scrollAmount > 1) {
      // Align to grid first
      viewportRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
    } else {
      // Already aligned, go to next
      viewportRef.current.scrollTo({ top: targetScroll + yearHeight, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="timeline-container flex flex-col">
      <div className="timeline flex ml-[5px]">
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
      <div className="top-navigation flex mt-4">
        <Button id="up-all" variant="outline" size="icon" onClick={handleUpAll}>
          <ChevronsUpIcon />
        </Button>
        <Button  id="up-one" variant="outline" size="icon" className=" ml-2" onClick={handleUpOne}>
          <ChevronUpIcon />
        </Button>
      </div>
      <div className="bottom-navigation flex mt-2">
        <Button id="down-all" variant="outline" size="icon" onClick={handleDownAll}>
          <ChevronsDownIcon />
        </Button>
        <Button id="down-one" variant="outline" size="icon" className="ml-2" onClick={handleDownOne}>
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  );
}

function YearButton({ year, isSelected = false, onClick, innerRef }: YearButtonProps) {
  const selectedStyle = "bg-accent";

  return (
    <div
      ref={(el) => innerRef?.(el)}
      className={cn(
        "flex items-center mr-[8px] -translate-x-[10px] transition-all duration-300"
      )}
    >
      <LeftCircle isVisible={isSelected} />
      <Button
        variant="ghost"
        onClick={() => onClick(year)}
        aria-pressed={isSelected}
        className={cn(
          "pr-[8px] rounded-none border-zinc-100 border-l-[3px] cursor-pointer hover:bg-accent",
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
      <div className="absolute w-2 h-2 rounded-full bg-neutral-400"></div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-primary"></div>
    </div>
  );
}