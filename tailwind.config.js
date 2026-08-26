/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAF9F5",
          raised: "#F2EFE7",
        },
        ink: {
          DEFAULT: "#211F1B",
          soft: "#5C5850",
          faint: "#8A8578",
        },
        rule: "#DEDACD",
        accent: {
          DEFAULT: "#3C5744",
          ink: "#233329",
          soft: "#E7ECE3",
        },
      },
      fontFamily: {
        display: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        meta: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wide2: "0.08em",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
