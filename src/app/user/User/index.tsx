"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { GithubLogoIcon, GlobeIcon, LinkedinLogoIcon } from "@phosphor-icons/react";

export default function User() {
  return (
    <div className="user-container flex items-center justify-end h-full">
      <div className="flex flex-col items-center justify-center mr-8">
        <Avatar className="w-[80px] h-[80px] mb-4 border-[3px] border-zinc-200">
          <AvatarImage src="https://github.com/thejournalist.png"/>
          <AvatarFallback>TJ</AvatarFallback>
        </Avatar>
        <h2 className="text-center pb-[4px] mb-[24px] px-[12px] border-b-[2px] border-b-zinc-200">The Journalist</h2>
        <div>
          <Button variant="outline" size="icon" className="rounded-lg border-zinc-300 hover:bg-zinc-100 cursor-pointer">
            <GithubLogoIcon weight="duotone" size={32}/>
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg mr-[8px] ml-[8px] border-blue-200 hover:bg-blue-50 cursor-pointer">
            <LinkedinLogoIcon weight="duotone" size={32} color="oklch(62.3% 0.214 259.815)" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-lg border-violet-200 hover:bg-violet-50 cursor-pointer">
            <GlobeIcon weight="duotone" size={32} color="oklch(60.6% 0.25 292.717)"/>
          </Button>
        </div>
      </div>
    </div>
)
}