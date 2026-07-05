import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadDMMono } from "@remotion/google-fonts/DMMono";

export const playfair = loadPlayfair("normal", {
  weights: ["700", "900"],
  subsets: ["latin"],
}).fontFamily;

export const dmSans = loadDMSans("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
}).fontFamily;

export const dmMono = loadDMMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
}).fontFamily;
