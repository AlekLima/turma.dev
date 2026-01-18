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
  const upAllButtonRef = useRef<HTMLButtonElement | null>(null);
  const downAllButtonRef = useRef<HTMLButtonElement | null>(null);
  const upOneButtonRef = useRef<HTMLButtonElement | null>(null);
  const downOneButtonRef = useRef<HTMLButtonElement | null>(null);
  const [errorButton, setErrorButton] = useState<string | null>(null);

  const navButtonErrorStyle = "animate-pulse !border-red-400 !bg-red-100 !text-red-600";

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

  const blinkError = useCallback((buttonId: string) => {
    setErrorButton(buttonId);
    setTimeout(() => {
      setErrorButton(null);
    }, 300);
  }, []);

  const handleUpAll = useCallback(() => {
    if (years.length === 0) return;
    const firstYear = years[0];
    if (selectedYear === firstYear) {
      blinkError('up-all');
    } else {
      setSelectedYear(firstYear);
      scrollToYear(firstYear);
    }
  }, [years, selectedYear, setSelectedYear, scrollToYear, blinkError]);

  const handleDownAll = useCallback(() => {
    if (years.length === 0) return;
    const lastYear = years[years.length - 1];
    if (selectedYear === lastYear) {
      blinkError('down-all');
    } else {
      setSelectedYear(lastYear);
      scrollToYear(lastYear);
    }
  }, [years, selectedYear, setSelectedYear, scrollToYear, blinkError]);

  const handleUpOne = useCallback(() => {
    if (!viewportRef.current || years.length === 0) return;

    if (selectedYear == null) {
      setSelectedYear(years[0]);
      scrollToYear(years[0]);
      return;
    }

    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex <= 0) {
      blinkError('up-one');
      return;
    }

    const previousYear = years[currentIndex - 1];
    setSelectedYear(previousYear);
    scrollToYear(previousYear);
  }, [years, selectedYear, setSelectedYear, scrollToYear, blinkError]);

  const handleDownOne = useCallback(() => {
    if (!viewportRef.current || years.length === 0) return;

    if (selectedYear == null) {
      setSelectedYear(years[0]);
      scrollToYear(years[0]);
      return;
    }

    const currentIndex = years.indexOf(selectedYear);
    if (currentIndex >= years.length - 1) {
      blinkError('down-one');
      return;
    }

    const nextYear = years[currentIndex + 1];
    setSelectedYear(nextYear);
    scrollToYear(nextYear);
  }, [years, selectedYear, setSelectedYear, scrollToYear, blinkError]);

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
              showError={errorButton !== null && year === selectedYear}
            />
          ))}
        </ScrollArea>
        <div id="black-border"
          className={`z-2 h-[36px] w-[3px] bg-zinc-900 -translate-x-[16px] text-transparent ease-out transition-[transform,opacity] duration-300 ${
            showBar ? "opacity-100" : "opacity-0 pointer-events-none"
          } ${errorButton ? "!bg-red-400" : ""}`}
          style={{ transform: `translateY(${blackBorderYTranslation}px)` }}
        >
        </div>
      </div>
      <div className="top-navigation flex mt-4">
        <Button
          ref={upAllButtonRef}
          id="up-all"
          variant="outline"
          size="icon"
          onClick={handleUpAll}
          className={cn(errorButton === 'up-all' && navButtonErrorStyle)}
        >
          <ChevronsUpIcon />
        </Button>
        <Button
          ref={upOneButtonRef}
          id="up-one"
          variant="outline"
          size="icon"
          className={cn("ml-2", errorButton === 'up-one' && navButtonErrorStyle)}
          onClick={handleUpOne}
        >
          <ChevronUpIcon />
        </Button>
      </div>
      <div className="bottom-navigation flex mt-2">
        <Button
          ref={downAllButtonRef}
          id="down-all"
          variant="outline"
          size="icon"
          onClick={handleDownAll}
          className={cn(errorButton === 'down-all' && navButtonErrorStyle)}
        >
          <ChevronsDownIcon />
        </Button>
        <Button
          ref={downOneButtonRef}
          id="down-one"
          variant="outline"
          size="icon"
          className={cn("ml-2", errorButton === 'down-one' && navButtonErrorStyle )}
          onClick={handleDownOne}
        >
          <ChevronDownIcon />
        </Button>
      </div>
    </div>
  );
}

function YearButton({ year, isSelected = false, onClick, innerRef, showError = false }: YearButtonProps) {
  const selectedStyle = "bg-accent";
  const errorStyle = "animate-pulse !bg-red-50 !text-red-600";

  return (
    <div
      ref={(el) => innerRef?.(el)}
      className={cn(
        "flex items-center mr-[8px] -translate-x-[10px] transition-all duration-300"
      )}
    >
      <LeftCircle isVisible={isSelected} showError={showError} />
      <Button
        variant="ghost"
        onClick={() => onClick(year)}
        aria-pressed={isSelected}
        className={cn(
          "pr-[8px] rounded-none border-zinc-100 border-l-[3px] cursor-pointer hover:bg-accent",
          isSelected && selectedStyle,
          showError && errorStyle
        )}
      >
        <span className={`text-[18px] ${suseMono.variable}`}>{year}</span>
      </Button>
    </div>
  );
}

function LeftCircle({ isVisible, showError = false }: LeftCircleProps) {
  return (
    <div
      className={cn(
        "relative -right-[12px] z-[999] flex items-center justify-center w-5 h-5 transform-gpu transition-all duration-200 ease-out",
        isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0",
        showError && "animate-pulse"
      )}
    >
      <div className={cn(
        "absolute w-2 h-2 rounded-full",
        showError ? "bg-red-200" : "bg-neutral-400"
      )}></div>
      <div className={cn(
        "absolute w-4 h-4 rounded-full border-2",
        showError ? "border-red-500" : "border-primary"
      )}></div>
    </div>
  );
}