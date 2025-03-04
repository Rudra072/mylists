/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "focus:border-[#FED9D7]",
    "focus:border-[#F97A71]",
    "focus:border-[#F65B51]",
    "focus:border-[#D92D20]",
    "focus:border-[#B42318]",
    "focus:border-[#FBE5C7]",
    "focus:border-[#F38744]",
    "focus:border-[#F07432]",
    "focus:border-[#E04F16]",
    "focus:border-[#BA3815]",
    "focus:border-[#FFF5B8]",
    "focus:border-[#FAC514]",
    "focus:border-[#EAAA08]",
    "focus:border-[#CA8504]",
    "focus:border-[#A15C07]",
    "focus:border-[#D3EEDB]",
    "focus:border-[#39AD5D]",
    "focus:border-[#349854]",
    "focus:border-[#256F3C]",
    "focus:border-[#206034]",
    "focus:border-[#D6EDFF]",
    "focus:border-[#68B9FD]",
    "focus:border-[#49A0FD]",
    "focus:border-[#1570EF]",
    "focus:border-[#165CD4]",
    "focus:border-[#E6E1FE]",
    "focus:border-[#AB93FB]",
    "focus:border-[#946DF8]",
    "focus:border-[#7838EE]",
    "focus:border-[#6927DB]",
    "focus:border-[#FDD9F2]",
    "focus:border-[#F670C7]",
    "focus:border-[#EE46BC]",
    "focus:border-[#DD2490]",
    "focus:border-[#C11574]",
    "hover:text-[#FED9D7]",
    "hover:text-[#F97A71]",
    "hover:text-[#F65B51]",
    "hover:text-[#D92D20]",
    "hover:text-[#B42318]",
    "hover:text-[#FBE5C7]",
    "hover:text-[#F38744]",
    "hover:text-[#F07432]",
    "hover:text-[#E04F16]",
    "hover:text-[#BA3815]",
    "hover:text-[#FFF5B8]",
    "hover:text-[#FAC514]",
    "hover:text-[#EAAA08]",
    "hover:text-[#CA8504]",
    "hover:text-[#A15C07]",
    "hover:text-[#D3EEDB]",
    "hover:text-[#39AD5D]",
    "hover:text-[#349854]",
    "hover:text-[#256F3C]",
    "hover:text-[#206034]",
    "hover:text-[#D6EDFF]",
    "hover:text-[#68B9FD]",
    "hover:text-[#49A0FD]",
    "hover:text-[#1570EF]",
    "hover:text-[#165CD4]",
    "hover:text-[#E6E1FE]",
    "hover:text-[#AB93FB]",
    "hover:text-[#946DF8]",
    "hover:text-[#7838EE]",
    "hover:text-[#6927DB]",
    "hover:text-[#FDD9F2]",
    "hover:text-[#F670C7]",
    "hover:text-[#EE46BC]",
    "hover:text-[#DD2490]",
    "hover:text-[#C11574]",
    "hover:fill-[#FED9D7]",
    "hover:fill-[#F97A71]",
    "hover:fill-[#F65B51]",
    "hover:fill-[#D92D20]",
    "hover:fill-[#B42318]",
    "hover:fill-[#FBE5C7]",
    "hover:fill-[#F38744]",
    "hover:fill-[#F07432]",
    "hover:fill-[#E04F16]",
    "hover:fill-[#BA3815]",
    "hover:fill-[#FFF5B8]",
    "hover:fill-[#FAC514]",
    "hover:fill-[#EAAA08]",
    "hover:fill-[#CA8504]",
    "hover:fill-[#A15C07]",
    "hover:fill-[#D3EEDB]",
    "hover:fill-[#39AD5D]",
    "hover:fill-[#349854]",
    "hover:fill-[#256F3C]",
    "hover:fill-[#206034]",
    "hover:fill-[#D6EDFF]",
    "hover:fill-[#68B9FD]",
    "hover:fill-[#49A0FD]",
    "hover:fill-[#1570EF]",
    "hover:fill-[#165CD4]",
    "hover:fill-[#E6E1FE]",
    "hover:fill-[#AB93FB]",
    "hover:fill-[#946DF8]",
    "hover:fill-[#7838EE]",
    "hover:fill-[#6927DB]",
    "hover:fill-[#FDD9F2]",
    "hover:fill-[#F670C7]",
    "hover:fill-[#EE46BC]",
    "hover:fill-[#DD2490]",
    "hover:fill-[#C11574]",
    "border-[#FED9D7]",
    "border-[#F97A71]",
    "border-[#F65B51]",
    "border-[#D92D20]",
    "border-[#B42318]",
    "border-[#FBE5C7]",
    "border-[#F38744]",
    "border-[#F07432]",
    "border-[#E04F16]",
    "border-[#BA3815]",
    "border-[#FFF5B8]",
    "border-[#FAC514]",
    "border-[#EAAA08]",
    "border-[#CA8504]",
    "border-[#A15C07]",
    "border-[#D3EEDB]",
    "border-[#39AD5D]",
    "border-[#349854]",
    "border-[#256F3C]",
    "border-[#206034]",
    "border-[#D6EDFF]",
    "border-[#68B9FD]",
    "border-[#49A0FD]",
    "border-[#1570EF]",
    "border-[#165CD4]",
    "border-[#E6E1FE]",
    "border-[#AB93FB]",
    "border-[#946DF8]",
    "border-[#7838EE]",
    "border-[#6927DB]",
    "border-[#FDD9F2]",
    "border-[#F670C7]",
    "border-[#EE46BC]",
    "border-[#DD2490]",
    "border-[#C11574]",
    "stroke-[#FED9D7]",
    "stroke-[#F97A71]",
    "stroke-[#F65B51]",
    "stroke-[#D92D20]",
    "stroke-[#B42318]",
    "stroke-[#FBE5C7]",
    "stroke-[#F38744]",
    "stroke-[#F07432]",
    "stroke-[#E04F16]",
    "stroke-[#BA3815]",
    "stroke-[#FFF5B8]",
    "stroke-[#FAC514]",
    "stroke-[#EAAA08]",
    "stroke-[#CA8504]",
    "stroke-[#A15C07]",
    "stroke-[#D3EEDB]",
    "stroke-[#39AD5D]",
    "stroke-[#349854]",
    "stroke-[#256F3C]",
    "stroke-[#206034]",
    "stroke-[#D6EDFF]",
    "stroke-[#68B9FD]",
    "stroke-[#49A0FD]",
    "stroke-[#1570EF]",
    "stroke-[#165CD4]",
    "stroke-[#E6E1FE]",
    "stroke-[#AB93FB]",
    "stroke-[#946DF8]",
    "stroke-[#7838EE]",
    "stroke-[#6927DB]",
    "stroke-[#FDD9F2]",
    "stroke-[#F670C7]",
    "stroke-[#EE46BC]",
    "stroke-[#DD2490]",
    "stroke-[#C11574]",
    "text-[#FED9D7]",
    "text-[#F97A71]",
    "text-[#F65B51]",
    "text-[#D92D20]",
    "text-[#B42318]",
    "text-[#FBE5C7]",
    "text-[#F38744]",
    "text-[#F07432]",
    "text-[#E04F16]",
    "text-[#BA3815]",
    "text-[#FFF5B8]",
    "text-[#FAC514]",
    "text-[#EAAA08]",
    "text-[#CA8504]",
    "text-[#A15C07]",
    "text-[#D3EEDB]",
    "text-[#39AD5D]",
    "text-[#349854]",
    "text-[#256F3C]",
    "text-[#206034]",
    "text-[#D6EDFF]",
    "text-[#68B9FD]",
    "text-[#49A0FD]",
    "text-[#1570EF]",
    "text-[#165CD4]",
    "text-[#E6E1FE]",
    "text-[#AB93FB]",
    "text-[#946DF8]",
    "text-[#7838EE]",
    "text-[#6927DB]",
    "text-[#FDD9F2]",
    "text-[#F670C7]",
    "text-[#EE46BC]",
    "text-[#DD2490]",
    "text-[#C11574]",
    "fill-[#FED9D7]",
    "fill-[#F97A71]",
    "fill-[#F65B51]",
    "fill-[#D92D20]",
    "fill-[#B42318]",
    "fill-[#FBE5C7]",
    "fill-[#F38744]",
    "fill-[#F07432]",
    "fill-[#E04F16]",
    "fill-[#BA3815]",
    "fill-[#FFF5B8]",
    "fill-[#FAC514]",
    "fill-[#EAAA08]",
    "fill-[#CA8504]",
    "fill-[#A15C07]",
    "fill-[#D3EEDB]",
    "fill-[#39AD5D]",
    "fill-[#349854]",
    "fill-[#256F3C]",
    "fill-[#206034]",
    "fill-[#D6EDFF]",
    "fill-[#68B9FD]",
    "fill-[#49A0FD]",
    "fill-[#1570EF]",
    "fill-[#165CD4]",
    "fill-[#E6E1FE]",
    "fill-[#AB93FB]",
    "fill-[#946DF8]",
    "fill-[#7838EE]",
    "fill-[#6927DB]",
    "fill-[#FDD9F2]",
    "fill-[#F670C7]",
    "fill-[#EE46BC]",
    "fill-[#DD2490]",
    "fill-[#C11574]",
    "[#FED9D7]",
    "[#F97A71]",
    "[#F65B51]",
    "[#D92D20]",
    "[#B42318]",
    "[#FBE5C7]",
    "[#F38744]",
    "[#F07432]",
    "[#E04F16]",
    "[#BA3815]",
    "[#FFF5B8]",
    "[#FAC514]",
    "[#EAAA08]",
    "[#CA8504]",
    "[#A15C07]",
    "[#D3EEDB]",
    "[#39AD5D]",
    "[#349854]",
    "[#256F3C]",
    "[#206034]",
    "[#D6EDFF]",
    "[#68B9FD]",
    "[#49A0FD]",
    "[#1570EF]",
    "[#165CD4]",
    "[#E6E1FE]",
    "[#AB93FB]",
    "[#946DF8]",
    "[#7838EE]",
    "[#6927DB]",
    "[#FDD9F2]",
    "[#F670C7]",
    "[#EE46BC]",
    "[#DD2490]",
    "[#C11574]",
    "bg-[#FED9D7]",
    "bg-[#F97A71]",
    "bg-[#F65B51]",
    "bg-[#D92D20]",
    "bg-[#B42318]",
    "bg-[#FBE5C7]",
    "bg-[#F38744]",
    "bg-[#F07432]",
    "bg-[#E04F16]",
    "bg-[#BA3815]",
    "bg-[#FFF5B8]",
    "bg-[#FAC514]",
    "bg-[#EAAA08]",
    "bg-[#CA8504]",
    "bg-[#A15C07]",
    "bg-[#D3EEDB]",
    "bg-[#39AD5D]",
    "bg-[#349854]",
    "bg-[#256F3C]",
    "bg-[#206034]",
    "bg-[#D6EDFF]",
    "bg-[#68B9FD]",
    "bg-[#49A0FD]",
    "bg-[#1570EF]",
    "bg-[#165CD4]",
    "bg-[#E6E1FE]",
    "bg-[#AB93FB]",
    "bg-[#946DF8]",
    "bg-[#7838EE]",
    "bg-[#6927DB]",
    "bg-[#FDD9F2]",
    "bg-[#F670C7]",
    "bg-[#EE46BC]",
    "bg-[#DD2490]",
    "bg-[#C11574]",
    "focus:ring-Red",
    "focus:ring-Orange",
    "focus:ring-Yellow",
    "focus:ring-Green",
    "focus:ring-Blue",
    "focus:ring-Violet",
    "focus:ring-Pink",
    "stroke-Red",
    "stroke-Orange",
    "stroke-Yellow",
    "stroke-Green",
    "stroke-Blue",
    "stroke-Violet",
    "stroke-Pink",
    "fill-Red",
    "fill-Orange",
    "fill-Yellow",
    "fill-Green",
    "fill-Blue",
    "fill-Violet",
    "fill-Pink",
  ],
  theme: {
    extend: {
      colors: {
        backgroundPrimary: "rgba(var(--backgroundPrimary))",
        backgroundSecondary: "rgba(var(--backgroundSecondary))",
        backgroundTertiary: "rgba(var(--backgroundTertiary))",
        backgroundOptional: "rgba(var(--backgroundOptional))",
        optionMenuHover: "rgba(var(--optionMenuHover))",
        gradient: "var(--gradient)",
        border: "rgba(var(--border))",
        stroke: "rgba(var(--stroke))",
        100: "#F0F2F5",
        textPrimary: "rgba(var(--textPrimary))",
        200: "#E1E5EA",
        300: "#C5CCD3",
        400: "#A9B2BC",
        500: "#8F99A3",
        textSecondary: "rgba(var(--textSecondary))",
        600: "#757F8A",
        textTertiary: "rgba(var(--textTertiary))",
        700: "#49515B",
        800: "#313840",
        900: "#1F242A",
        1000: "#101318",
        Red: "#F65B51",
        Orange: "#F07432",
        Yellow: "#EAAA08",
        Green: "#349854",
        Blue: "#49A0FD",
        Violet: "#946DF8",
        Pink: "#EE46BC",
      },
      fontSize: {
        headingH1: "28px",
        headingH2: "20px",
        menuItem: "16px",
        titleLG: "16px",
        titleMD: "14px",
        bodyMD: "14px",
        bodySM: "12px",
        button: "12px",
        tag: "12px",
      },
      letterSpacing: {
        H1: "-3",
        H2: "-2",
      },
      lineHeight: {
        heading: "1.2",
        menuTitleLG: "1.6",
        other: "1.4",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
