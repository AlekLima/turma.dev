"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

type BackgroundContextType = {
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
};

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export function BackgroundProvider({
  children,
  initialYear = null,
}: {
  children: ReactNode;
  initialYear?: number | null;
}) {
  const [selectedYear, setSelectedYear] = useState<number | null>(initialYear ?? null);

  return (
    <BackgroundContext.Provider value={{ selectedYear, setSelectedYear }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used within BackgroundProvider");
  return ctx;
}

export default BackgroundContext;
