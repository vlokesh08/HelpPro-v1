/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      spacegotesk: ["Space Grotesk", "sans-serif"],
    },
    container: {
      center: true,
      padding: "5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(104,98,195,1) 0%, rgba(104,104,193,1) 6%, rgba(0,212,255,1) 100%)',
      },
      colors: {
        "def": "#f5f7f7",
        "button-clr" : "#3a86ff",
        "dark-body" : "#212c3c",
        "dark-box" : "#283445"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}