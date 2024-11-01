import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#FFEDDB",
      secondary: "#E3B7A0",
      accent: "#54473F",
      red: "#FF0000",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#FFEDDB",
            secondary: "#E3B7A0",
            content1: "#FFEDDB",
            background: "#FBFBFB",
            focus: "#FFEDDB",
            warning: "#BF9270",
          },
        },
      },
    }),
  ],
};
export default config;
