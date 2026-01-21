"use client";

import React, { useRef, useCallback, useEffect } from "react";
import { useBackground } from "../../../contexts/BackgroundContext";
import ContentItem from "../ContentItem";

export default function ContentArea() {
  const {
    selectedYear,
    selectedContent,
    setSelectedContent,
    selectedYearContentList,
  } = useBackground();

  const items = selectedYearContentList;
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);

  // Scroll para o item selecionado
  const scrollToItem = useCallback((itemId: string) => {
    if (!containerRef.current) return;

    const element = document.getElementById(itemId);
    if (!element) return;

    isScrolling.current = true;
    
    const container = containerRef.current;
    const elementTop = element.offsetTop;
    
    container.scrollTo({
      top: elementTop - 80,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  }, []);

  // Efeito para scroll quando selectedContent mudar (ex: clique no bullet)
  useEffect(() => {
    if (!selectedContent) return;
    scrollToItem(selectedContent);
  }, [selectedContent, scrollToItem]);

  // Handler de wheel para simular comportamento de carrossel
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    // Previne scroll nativo durante animação
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const now = Date.now();
    // Debounce de 300ms entre scrolls
    if (now - lastScrollTime.current < 300) {
      e.preventDefault();
      return;
    }

    const currentIndex = items.findIndex(item => item.id === selectedContent);
    if (currentIndex === -1) return;

    // Detecta direção do scroll
    const isScrollingDown = e.deltaY > 0;
    
    let nextIndex = currentIndex;
    
    if (isScrollingDown && currentIndex < items.length - 1) {
      // Scroll para baixo
      nextIndex = currentIndex + 1;
    } else if (!isScrollingDown && currentIndex > 0) {
      // Scroll para cima
      nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex) {
      e.preventDefault();
      lastScrollTime.current = now;
      setSelectedContent(items[nextIndex].id);
    }
  }, [items, selectedContent, setSelectedContent]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      className="content-area flex flex-col md:pl-6 max-h-[290px] h-[290px] overflow-y-auto scroll-smooth hide-scrollbar"
      style={{ scrollBehavior: 'smooth' }}
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

            const isNext = index > currentIndex;
            const isLastItem = index === items.length - 1;

            return (
              <ContentItem
                key={period.id}
                background={period}
                isNotUniqueOrLast={isNotUniqueOrLast}
                isNext={isNext}
                isLastItem={isLastItem}
                containerHeight={290}
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
    </div>
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
