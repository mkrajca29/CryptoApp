module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
