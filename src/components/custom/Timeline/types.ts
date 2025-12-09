export type TimelineItemProps = {
  years: number[];
};

export type YearButtonProps = {
  year: number;
  isSelected: boolean;
  onClick: (year: number) => void;
  innerRef?: (el: HTMLDivElement | null) => void;
}

export type LeftCircleProps = {
  isVisible: boolean;
}