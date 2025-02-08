import React from "react";
import { useGetUserPreferenceQuery } from "../../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../../customHooks/useGetColorVariants";

function MarkCompleted({ setEditMode, theme }) {
  const { data: pref } = useGetUserPreferenceQuery();
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });

  return (
    <div
      className={`${
        theme === "Dark" ? "border-b border-700" : "border-b border-300"
      } flex justify-between px-[30px] py-[15px] `}
    >
      <button
        className={`text-white bg-[${
          colorScheme && colorScheme[300]
        }] px-4 py-2 rounded-[25px]`}
      >
        <p className="text-[13px]">Mark Completed</p>
      </button>
      <svg
        onClick={() => setEditMode(false)}
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
    </div>
  );
}

export default MarkCompleted;
