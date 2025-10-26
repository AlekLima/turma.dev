"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GithubLogoIcon, GlobeIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { ReactNode } from "react";
import { GoToButtonProps, GoToButtonStyles, GoToButtonType, GoToSectionProps, UserProps } from "./types";
import { getGoButtonStyles, urlToGoToButtonTypeRegex } from "./utils";

function RightUserInfo({ name, lastName, profilePhotoUrl, urls}: UserProps) {
  const nameInitials: string = `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`

  return (
    <div className="w-fit flex flex-col items-center justify-center mr-8">
      <div className="flex flex-col items-center">
        <Avatar className="w-[80px] h-[80px] mb-4 border-[3px] border-zinc-200">
          <AvatarImage src={profilePhotoUrl}/>
          <AvatarFallback>{nameInitials}</AvatarFallback>
        </Avatar>
        <h2 className="w-full pr-4 text-center flex justify-end text-nowrap">
          {`${name} ${lastName}`}
        </h2>
      </div>

      <div className="w-full h-[2px] mb-4 mt-2 border-b-[2px] border-b-zinc-200"></div>

      <GoToSection goToUrls={urls}/>
    </div>
  )
}

export default function User(userData: UserProps) {

  return (
    <div className="user-container flex items-center justify-end h-full w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="h-[120px]"></div>
        <div className="w-full h-[2px] mb-4 mt-2 border-b-[2px] border-b-zinc-200"></div>
        <div className="h-[36px]"></div>
      </div>

      <RightUserInfo {...userData }/>
    </div>
  )
}

function GoToSection({ goToUrls }: GoToSectionProps) {
  return (
    <div className="flex gap-2">
      {goToUrls.map((url: string) => (
        <GoToButton key={url} url={url} />
      ))}
    </div>
  )
}

function getGoButtonIcon(type: GoToButtonType): ReactNode {
  switch(type)  {
    case GoToButtonType.GITHUB:
      return <GithubLogoIcon weight="duotone" size={32} color="oklch(55.2% 0.016 285.938)"/>;
    case GoToButtonType.LINKEDIN:
      return <LinkedinLogoIcon weight="duotone" size={32} color="oklch(62.3% 0.214 259.815)" />;
    case GoToButtonType.WEBSITE:
      return <GlobeIcon weight="duotone" size={32} color="oklch(60.6% 0.25 292.717)"/>;
    default:
      return null;
  }
}

function GoToButton({ url } : GoToButtonProps) {
  const type : GoToButtonType = urlToGoToButtonTypeRegex(url);
  const icon : ReactNode = getGoButtonIcon(type);
  const { borderColor, hoverBgColor }: GoToButtonStyles = getGoButtonStyles(type);

  if (type === GoToButtonType.INVALID) {
    console.error(`Invalid URL provided to GoToButton: ${url}`);
    return null;
  }

  return (
    <Button variant="outline" size="icon" className={`rounded-lg cursor-pointer border-${borderColor} hover:bg-${hoverBgColor}`}>
      <Link href={url} target="_blank">
        {icon}
      </Link>
    </Button>
  )
}
