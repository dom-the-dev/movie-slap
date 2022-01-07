const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      brand: "#DA1F50",
      dark: "#171435",
      semi: "#304455",
      mid: "#829BB0",
      // mid: "#8F8AC0",
      light: "#FFFFFF",
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      blue: colors.blue,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
    },
    extend: {},
  },
  plugins: [],
}
