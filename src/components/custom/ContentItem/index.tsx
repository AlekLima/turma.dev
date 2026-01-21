"use client";

import { Background } from "@/background-data";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { changaSans, courstardSans } from "@/lib/fonts";
import { HourglassIcon, MapPinAreaIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { getRandomColor, numberToMonthPTBR } from "./utils";
import {
  MonthBulletProps,
  colorMap,
  ContentItemProps,
  ProjectButtonProps,
} from "./types";
import { cn } from "@/lib/utils";

export default function ContentItem({
  background,
  isNotUniqueOrLast,
  isPrevious,
  isNext,
  isCurrent,
}: ContentItemProps) {
  const {
    id,
    month,
    title,
    description,
    location,
    durationInMonths,
    projects,
  } = background;

  // Hide previous content completely
  if (isPrevious) {
    return null;
  }

  // Apply 30% opacity to next content
  const opacityClass = isNext ? "opacity-30" : "opacity-100";
  const transitionClass = "transition-opacity duration-300";

  return (
    <li
      id={id}
      className={cn(
        `flex flex-col items-start justify-between ${courstardSans.className} text-gray-400 txt-xs ${opacityClass} ${transitionClass}`,
        isNotUniqueOrLast && "mb-8",
      )}
    >
      {month && (
        <MonthBullet
          color={getRandomColor()}
          month={month}
          isGrayScale={isNext}
        />
      )}

      <PeriodInfo
        title={title}
        description={description}
        location={location}
        durationInMonths={durationInMonths}
      />

      {projects && <ProjectsList projects={projects} />}
    </li>
  );
}

function MonthBullet({ color, month, isGrayScale = false }: MonthBulletProps) {
  // Use grayscale when isGrayScale is true (for next content), otherwise use the assigned color
  const { bg, border } = isGrayScale
    ? { bg: "bg-neutral-400", border: "border-neutral-400" }
    : colorMap[color];

  return (
    <div className="flex">
      <div className="relative flex items-center justify-center w-5 h-5 mr-2">
        <div className={`absolute w-2 h-2 rounded-full ${bg}`}></div>
        <div
          className={`absolute w-4 h-4 rounded-full border-2 ${border}`}
        ></div>
      </div>
      <span className="text-sm text-gray-500 pb-2">{` ${numberToMonthPTBR(month)}`}</span>
    </div>
  );
}

function PeriodInfo({
  title,
  description,
  location,
  durationInMonths,
}: Omit<Background, "year" | "month" | "projects" | "id">) {
  return (
    <div className="ml-2 pl-[26px] border-zinc-900 border-l-[2px]">
      <h2 className={`${changaSans.className} text-zinc-950 text-2xl`}>
        {title}
      </h2>
      <p className="text-sm max-w-[300px]">{description}</p>

      {location && <LocationInfo location={location} />}
      {durationInMonths && <DurationInfo durationInMonths={durationInMonths} />}
    </div>
  );
}

function DurationInfo({ durationInMonths }: { durationInMonths?: number }) {
  return (
    <div>
      <div className="flex items-center pt-6 gap-2 text-sm">
        <HourglassIcon size={24} weight="duotone" />
        <span>{durationInMonths} months</span>
      </div>
    </div>
  );
}

function LocationInfo({ location }: { location?: string }) {
  return (
    <div className="flex items-center gap-2 pt-6 pb-2 text-sm">
      <MapPinAreaIcon size={24} weight="duotone" />
      <span>{location}</span>
    </div>
  );
}

function ProjectsList({
  projects,
}: {
  projects?: { url: string; name: string }[];
}) {
  return (
    <div className="pl-9 mt-2">
      <h3
        className={`${changaSans.className} pb-2 text-lg text-gray-500 font-semibold`}
      >
        Projects
      </h3>

      <ul className="list-disc list-inside">
        {projects?.map((project, index) => {
          const isNotUniqueOrLast =
            projects.length !== 1 && index < projects.length - 1;

          return (
            <ProjectButton
              key={project.name}
              project={project}
              isNotUniqueOrLast={isNotUniqueOrLast}
            />
          );
        })}
      </ul>
    </div>
  );
}

function ProjectButton({ project, isNotUniqueOrLast }: ProjectButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            "text-orange-600 hover:text-white bg-orange-50  hover:bg-orange-500 cursor-pointer",
            isNotUniqueOrLast && "mr-4",
          )}
        >
          <Link
            href={project.url}
            className="text-bold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.name.charAt(0).toUpperCase()}
          </Link>
        </Button>
      </TooltipTrigger>

      <TooltipContent side="bottom" sideOffset={8}>
        {project.name}
      </TooltipContent>
    </Tooltip>
  );
}
