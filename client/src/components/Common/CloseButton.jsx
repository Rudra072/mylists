import React from "react";

const CloseButton = ({ setEditMode, theme }) => {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => setEditMode((prev) => !prev)}
      className="cursor-pointer"
    >
      <circle cx="12" cy="12" r="9" fill="#7E869E" fillOpacity="0.25" />
      <path
        d="M9 9L15 15"
        className="stroke-stroke"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M15 9L9 15"
        className="stroke-stroke"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CloseButton;
