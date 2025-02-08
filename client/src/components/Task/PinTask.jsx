import React from "react";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import { color } from "framer-motion";
function PinTask({
  setSettingDate,
  addForm,
  day,
  dueMonth,
  task,
  onPinClick,
  isPinned,
}) {
  const { data: pref } = useGetUserPreferenceQuery();
  return (
    <div
      className={`bg-backgroundSecondary flex justify-between items-center px-[15px] py-[5px] rounded-b-[10px]`}
    >
      <div
        className="flex gap-[3px] justify-center align-middle cursor-pointer hover:"
        onClick={() => setSettingDate((prev) => !prev)}
      >
        <svg
          className={`${task?.duedate && "hidden"}`}
          width="20"
          height="20"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.5 0.5V4.5M11.5 0.5V4.5" className="stroke-stroke" />
          <rect
            x="0.5"
            y="2.5"
            width="15"
            height="14"
            rx="3.5"
            className="stroke-stroke"
          />
          <path d="M1 6.5H15.5" className="stroke-stroke" />
          <rect x="4" y="10" width="2" height="1" className="fill-stroke" />
          <rect x="7" y="10" width="2" height="1" className="fill-stroke" />
          <rect x="10" y="10" width="2" height="1" className="fill-stroke" />
          <rect x="4" y="13" width="2" height="1" className="fill-stroke" />
          <rect x="7" y="13" width="2" height="1" className="fill-stroke" />
          <rect x="10" y="13" width="2" height="1" className="fill-stroke" />
        </svg>
        {addForm ? (
          <div className="text-titleMD flex gap-[3px]">
            <p className="text-textSecondary">Due date: </p>
            <p className="text-textTertiary">
              {day} {dueMonth}
            </p>
          </div>
        ) : (
          <div className="text-titleMD flex gap-[3px]">
            <p className="text-textSecondary">Due date: </p>
            <p className="text-textTertiary">{task?.duedate}</p>
          </div>
        )}
      </div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        class={`cursor-pointer ${
          isPinned
            ? `fill-${pref?.colorScheme} stroke-${pref?.colorScheme}`
            : "fill-transparent stroke-stroke"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        onClick={onPinClick}
      >
        <path d="M14.6358 3.90949C15.2888 3.47412 15.6153 3.25643 15.9711 3.29166C16.3269 3.32689 16.6044 3.60439 17.1594 4.15938L19.8406 6.84062C20.3956 7.39561 20.6731 7.67311 20.7083 8.02888C20.7436 8.38465 20.5259 8.71118 20.0905 9.36424L18.4419 11.8372C17.88 12.68 17.5991 13.1013 17.3749 13.5511C17.2086 13.8845 17.0659 14.2292 16.9476 14.5825C16.7882 15.0591 16.6889 15.5557 16.4902 16.5489L16.2992 17.5038C16.2986 17.5072 16.2982 17.5089 16.298 17.5101C16.1556 18.213 15.3414 18.5419 14.7508 18.1351C14.7497 18.1344 14.7483 18.1334 14.7455 18.1315V18.1315C14.7322 18.1223 14.7255 18.1177 14.7189 18.1131C11.2692 15.7225 8.27754 12.7308 5.88691 9.28108C5.88233 9.27448 5.87772 9.26782 5.86851 9.25451V9.25451C5.86655 9.25169 5.86558 9.25028 5.86486 9.24924C5.45815 8.65858 5.78704 7.84444 6.4899 7.70202C6.49113 7.70177 6.49282 7.70144 6.49618 7.70076L7.45114 7.50977C8.44433 7.31113 8.94092 7.21182 9.4175 7.05236C9.77083 6.93415 10.1155 6.79139 10.4489 6.62514C10.8987 6.40089 11.32 6.11998 12.1628 5.55815L14.6358 3.90949Z"></path>
        <path
          d="M5 19L9.5 14.5"
          trokeLinecap="round"
          className={`${
            isPinned ? `stroke-${pref?.colorScheme}` : "stroke-stroke"
          }`}
        ></path>
      </svg>
    </div>
  );
}

export default PinTask;
