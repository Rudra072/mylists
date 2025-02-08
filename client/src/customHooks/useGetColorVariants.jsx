import React from "react";

const useGetColorVariants = ({ color }) => {
  const predefinedColors = {
    Red: {
      100: "#FED9D7",
      200: "#F97A71",
      300: "#F65B51",
      400: "#D92D20",
      500: "#B42318",
      gradient: "red-gradient",
    },
    Orange: {
      100: "#FBE5C7",
      200: "#F38744",
      300: "#F07432",
      400: "#E04F16",
      500: "#BA3815",
      gradient: "orange-gradient",
    },
    Yellow: {
      100: "#FFF5B8",
      200: "#FAC514",
      300: "#EAAA08",
      400: "#CA8504",
      500: "#A15C07",
      gradient: "yellow-gradient",
    },
    Green: {
      100: "#D3EEDB",
      200: "#39AD5D",
      300: "#349854",
      400: "#256F3C",
      500: "#206034",
      gradient: "green-gradient",
    },
    Blue: {
      100: "#D6EDFF",
      200: "#68B9FD",
      300: "#49A0FD",
      400: "#1570EF",
      500: "#165CD4",
      gradient: "blue-gradient",
    },
    Violet: {
      100: "#E6E1FE",
      200: "#AB93FB",
      300: "#946DF8",
      400: "#7838EE",
      500: "#6927DB",
      gradient: "violet-gradient",
    },
    Pink: {
      100: "#FDD9F2",
      200: "#F670C7",
      300: "#EE46BC",
      400: "#DD2490",
      500: "#C11574",
      gradient: "pink-gradient",
    },
  };
  const colorScheme = predefinedColors[color];
  const gradient = colorScheme?.gradient;
  return { colorScheme, color, gradient };
};

export default useGetColorVariants;
