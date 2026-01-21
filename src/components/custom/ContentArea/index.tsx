"use client";

import React from "react";
import { useBackground } from "../../../contexts/BackgroundContext";
import ContentItem from "../ContentItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ContentArea() {
  const {
    selectedYear,
    selectedContent,
    setSelectedContent,
    selectedYearContentList,
  } = useBackground();

  const items = selectedYearContentList;

  return (
    <ScrollArea
      className="content-area scroll-area flex flex-col md:pl-6 max-h-[290px] h-[290px]"
      hideScrollbar
    >
      <h1 className="text-3xl pb-4 mb-6 sticky top-0 z-10 bg-white shadow-xs">
        {selectedYear}
      </h1>

      <div className="content-view flex justify-between">
        <ul className="content-list">
          {items.map((period, index) => {
            const isNotUniqueOrLast =
              items.length !== 1 && index < items.length - 1;

            const currentIndex = items.findIndex(
              (item) => item.id === selectedContent,
            );

            const isPrevious = index < currentIndex;
            const isNext = index > currentIndex;

            return (
              <ContentItem
                key={period.id}
                background={period}
                isNotUniqueOrLast={isNotUniqueOrLast}
                isPrevious={isPrevious}
                isNext={isNext}
              />
            );
          })}
        </ul>

        <ul className="bullet-list ml-4">
          {items.map((period) => {
            const isActive = period.id === selectedContent;

            return (
              <Bullet
                key={period.id}
                isActive={isActive}
                onClick={() => setSelectedContent(period.id)}
              />
            );
          })}
        </ul>
      </div>
    </ScrollArea>
  );
}

export type BulletProps = {
  isActive: boolean;
  onClick: () => void;
};

function Bullet({ isActive, onClick }: BulletProps) {
  const opacity = isActive ? "opacity-100" : "opacity-25";

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-5 h-5 ${opacity} cursor-pointer hover:opacity-75 transition-opacity mb-2`}
    >
      <div className={`absolute w-2 h-2 rounded-full bg-neutral-400`}></div>
      <div
        className={`absolute w-4 h-4 rounded-full border-2 border-primary`}
      ></div>
    </button>
  );
}
