export type TimelineItemProps = {
  years: number[];
};

export type YearButtonProps = {
  year: number;
  isSelected: boolean;
  onSelect?: (year: number) => void;
}

export type LeftCircleProps = {
  isVisible: boolean;
}