module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryLightColor: "var(--primary-light-color)",
        secondaryLightColor: "var(--secondary-light-color)",
        darkPrimaryColor: "var(--dark-primary-color)",
        darkSecondaryColor: "var(--dark-secondary-color)",
      },
    },
  },
  plugins: [],
};
