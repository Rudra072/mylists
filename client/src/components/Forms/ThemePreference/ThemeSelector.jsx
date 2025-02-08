import React from "react";

function ThemeSelector({ onChange, theme }) {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <div
        className={`border-[1.5px] rounded-[10px] w-[300px] ${
          theme === "Light" ? "border-Blue" : "border-300"
        }`}
        onClick={() => onChange("Light")}
      >
        <div
          className={`border-b-[1.5px] min-h-[150px] bg-lightMode bg-cover rounded-t-[10px] ${
            theme === "Light" ? "border-Blue" : "border-300"
          }`}
        ></div>
        <div className="flex justify-between items-center flex-wrap px-[20px] py-[10px]">
          <h1 className="font-bold">Light mode theme</h1>
        </div>
      </div>
      <div
        className={`border-[1.5px] rounded-[10px] w-[300px] ${
          theme === "Dark" ? "border-Blue" : "border-300"
        }`}
        onClick={() => onChange("Dark")}
      >
        <div
          className={`border-b-[1.5px] min-h-[150px] bg-darkMode bg-cover rounded-t-[10px]  ${
            theme === "Dark" ? " border-Blue" : "border-300"
          }`}
        ></div>
        <div className="flex justify-between items-center flex-wrap px-[20px] py-[10px]">
          <h1 className="font-bold">Dark mode theme</h1>
        </div>
      </div>
    </div>
  );
}

export default ThemeSelector;
