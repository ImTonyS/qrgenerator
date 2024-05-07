/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      textShadow: {
        'default': '0 20px 4px rgba(0, 0, 0, 0.5)',
        'lg': '0 10px 6px rgba(0, 0, 0, 1)'
      }
    },
  },
  plugins: [],
}

