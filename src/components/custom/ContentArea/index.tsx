"use client"

import React from "react";
import { useBackground } from "../../../contexts/BackgroundContext";
import ContentItem from "../ContentItem";
import { contentData } from "@/background-data";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ContentArea() {
  const { selectedYear } = useBackground();

  const items = selectedYear == null ? [] : contentData.filter((c) => c.year === selectedYear);

  return (
    <ScrollArea className="content-area scroll-area flex flex-col md:pl-6 max-h-[290px] h-[290px]" hideScrollbar>
      <h1 className="text-3xl pb-4 mb-6 sticky top-0 z-10 bg-white shadow-xs">{selectedYear}</h1>

      <div className="content-view flex justify-between">
        <ul className="content-list">
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
        </ul>
        <ul className="bullet-list ml-4">
          {items.map((period, index) => {
            const isActive = index === 0;
            return <Bullet key={period.id} isActive={isActive} />;
          })}
        </ul>
      </div>
    </ScrollArea>
  );
}

export type BulletProps = {
  isActive: boolean;
}

function Bullet({ isActive }: BulletProps) {
  const opacity = isActive ? "opacity-100" : "opacity-25";

  return (
    <div className={`flex items-center justify-center w-5 h-5 ${opacity}`}>
      <div className={`absolute w-2 h-2 rounded-full bg-neutral-400`}></div>
      <div className={`absolute w-4 h-4 rounded-full border-2 border-primary`}></div>
    </div>
  )
}