import { HourglassIcon } from "@phosphor-icons/react";

export default function DurationInfo({ durationInMonths }: { durationInMonths?: number }) {
  return (
    <div>
      <div className="flex items-center pt-6 gap-2 text-sm">
        <HourglassIcon size={16} weight="duotone" />
        <span>{durationInMonths} months</span>
      </div>
    </div>
  );
}