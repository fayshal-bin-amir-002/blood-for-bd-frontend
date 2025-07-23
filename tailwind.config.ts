/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // include all your component files
    "./app/**/*.{js,ts,jsx,tsx}", // include app directory if using Next.js app router
  ],
  theme: {
    extend: {
      maxWidth: {
        container: "1280px",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")], // for 'prose' styles
};
