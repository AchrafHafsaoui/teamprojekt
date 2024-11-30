module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primary-color)",
        secondaryColor: "var(--secondary-color)",
        componentsColor: "var(--components-color)",
        borderColor: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
