// import type { Config } from "tailwindcss";
// import { nextui } from "@nextui-org/react";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#FFEDDB",
//         secondary: "#E3B7A0",
//         accent: "#54473F",
//         red: "#FF0000",
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [
//     nextui({
//       addCommonColors: false, // evita sobrescribir colores comunes de Tailwind (e.g. "blue").
//       themes: {
//         light: {
//           colors: {
//             primary: "#FFEDDB",
//             secondary: "#E3B7A0",
//             content1: "#FFEDDB",
//             background: "#FBFBFB",
//             focus: "#FFEDDB",
//             warning: "#BF9270",
//           },
//         },
//       },
//     }),
//   ],
// };
// export default config;

import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#FFEDDB",
          DEFAULT: "#FFEDDB",
        },
        secondary: "#E3B7A0",
        accent: "#54473F",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#FFEDDB",
            secondary: "#E3B7A0",
            warning: "#BF9270",
          },
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
} satisfies Config;
