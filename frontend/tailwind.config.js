/** @type {import('tailwindcss').Config} */
export default {
  // file types that we want to apply tailwindcss to
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "10rem",
      }
    },
  },
  plugins: [],
}

