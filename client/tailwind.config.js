/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0B4A3C",
          light: "#146254",
          dark: "#073229",
        },
        cream: "#FBF6EE",
        mint: "#BDEBD3",
        blush: "#FBD2E1",
        lilac: "#E4D3F5",
        butter: "#FDF0BE",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "ciao-gradient":
          "linear-gradient(120deg, #BDEBD3 0%, #FBD2E1 35%, #E4D3F5 65%, #FDF0BE 100%)",
        "ciao-gradient-soft":
          "linear-gradient(120deg, rgba(189,235,211,0.5) 0%, rgba(251,210,225,0.5) 35%, rgba(228,211,245,0.5) 65%, rgba(253,240,190,0.5) 100%)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
