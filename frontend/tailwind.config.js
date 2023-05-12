/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: '#fff',
      }
    },
  },
  plugins: [],
}
