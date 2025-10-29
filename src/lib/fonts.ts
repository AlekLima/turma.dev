import { Changa, Coustard, Monomaniac_One, SUSE } from "next/font/google";

export const monomaniac = Monomaniac_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-monomaniac",
});

export const changaSans = Changa({
  variable: "--font-changa",
  subsets: ["latin"],
  weight: ["400"],
});

export const suseMono = SUSE({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-suse-mono",
});

export const courstardSans = Coustard({
  variable: "--font-courstard-sans",
  subsets: ["latin"],
  weight: ["400"],
});

const _fonts = {};
export default _fonts;
