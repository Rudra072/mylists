import React from "react";

function ColorSelector({
  onChange,
  color,
  defaultColor,
  initial,
  theme,
  borderColor,
}) {
  const colors = [
    { bg: "bg-Red", name: "Red" },
    { bg: "bg-Orange", name: "Orange" },
    { bg: "bg-Yellow", name: "Yellow" },
    { bg: "bg-Green", name: "Green" },
    { bg: "bg-Blue", name: "Blue" },
    { bg: "bg-Violet", name: "Violet" },
    { bg: "bg-Pink", name: "Pink" },
  ];
  initial && (defaultColor = color);

  return (
    <div className="mb-6">
      <h1 className="font-bold text-titleMD">Customize primary color</h1>
      <p className="text-bodySM text-500 mb-[10px]">
        Choose your favourite color theme
      </p>
      <div
        className={`bg-backgroundSecondary ${
          borderColor ? "border-300" : "border-border"
        } min-h-[65px] border-[1.5px] rounded-[10px] flex flex-wrap justify-evenly items-center`}
      >
        {colors.map((c) => (
          <button
            type="button"
            key={c.bg}
            onClick={() => onChange(c.name)}
            className={`${defaultColor === c.name && "scale-[2.2]"}`}
          >
            <div className={`w-[17px] h-[17px] ${c.bg} rounded-xl relative`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[1px] left-[1px]"
              >
                <path
                  d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                  stroke="white"
                  strokeLinecap="round"
                  className={`${defaultColor === c.name ? "block" : "hidden"}`}
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ColorSelector;
