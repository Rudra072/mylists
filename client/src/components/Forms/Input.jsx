import React from "react";

const Input = ({
  text,
  onChange,
  onBlur,
  value,
  name,
  error,
  colorScheme,
  theme,
  pref,
  normalInput,
}) => {
  return (
    <div>
      <h1 className={`text-titleMD font-bold text-textTertiary mb-2`}>
        {text}
      </h1>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        // onBlur={onBlur}
        className={`bg-backgroundSecondary ${
          normalInput ? "border-[#C6CDD4]" : "border-border"
        }  border-[1.5px] w-full py-[8px] px-[20px] rounded-[10px] outline-none focus:ring-2 focus:ring-${
          pref ? pref?.colorScheme : "Blue"
        }`}
      />
      <p className="text-bodySM"> {error}</p>
    </div>
  );
};

export default Input;
