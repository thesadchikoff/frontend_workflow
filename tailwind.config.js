/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      notebook: '900px',
      tablet: '600px',
      desktop: '1200px',
      mobile: '300px',
    },
    extend: {},
  },
  plugins: [],
}