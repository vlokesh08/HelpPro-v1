/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,jsx,ts,tsx,json}',
    './components/**/*.{js,jsx,ts,tsx,json}',
    './app/**/*.{js,jsx,ts,tsx,json}',
    './src/**/*.{js,jsx,ts,tsx,json}',
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
        'searchBG' : 'url("/images/searchBG3.jpg")',
        'searchBG1' : 'url("/images/searchBG3.jpg")',

      },
      colors: {
        "def": "#f5f7f7",
        "button-clr" : "#3a86ff",
        "dark-body" : "#212c3c",
        "dark-box" : "#283445",
        "light-body": "#f5f7f7",
        "light-button" : "#d2e0ff"
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
        "fadeIn": {
          '0%': { opacity: 0, backgroundColor: '#f5f7f7' },
          '50%':{ opacity: 0.5, backgroundColor: '#f5f7f7'},
          '100%': { opacity: 1, backgroundColor: '#f5f7f7' },
        },
        "fadeInDark": {
          '0%': { opacity: 0, backgroundColor: '#212c3c' },
          '50%':{ opacity: 0.5, backgroundColor: '#212c3c'},
          '100%': { opacity: 1, backgroundColor: '#212c3c' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeIn": 'fadeIn 0.3s ease-in',
        "fadeInDark": 'fadeInDark 0.3s ease-in',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}