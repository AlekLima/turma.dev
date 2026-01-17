"use client"

import React from "react";
import { useBackground } from "../../../contexts/BackgroundContext";
import ContentItem from "../ContentItem";
import { contentData } from "@/background-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ContentView() {
  const { selectedYear } = useBackground();

  const items = selectedYear == null ? [] : contentData.filter((c) => c.year === selectedYear);

  return (
    <ScrollArea className="content-container scroll-area flex flex-col md:pl-6 max-h-[290px] h-[290px]">
      <h1 className="text-3xl pb-4 mb-6 sticky top-0 z-10 bg-white shadow-xs">{selectedYear}</h1>
      {items.map((period, index) => {
        const isNotUniqueOrLast = items.length !== 1 && index < items.length - 1;
        return (
          <ContentItem
            key={period.id}
            background={period}
            isNotUniqueOrLast={isNotUniqueOrLast}
          />
        );
      })}
    </ScrollArea>
  );
}
