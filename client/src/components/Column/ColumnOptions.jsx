import React from "react";
import { Tooltip } from "@nextui-org/tooltip";

function ColumnOptions({
  adding,
  setAdding,
  setOptionMenu,
  optionMenu,
  colorScheme,
}) {
  return (
    <div className="flex items-center cursor-pointer">
      <Tooltip
        showArrow={true}
        content="Add task"
        color="default"
        delay={0}
        closeDelay={0}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            adding ? `stroke-[${colorScheme[300]}]` : "stroke-stroke"
          }`}
          onClick={() => setAdding((prev) => !prev)}
        >
          <path d="M12 6L12 18" strokeLinecap="round" />
          <path d="M18 12L6 12" strokeLinecap="round" />
        </svg>
      </Tooltip>
      <Tooltip
        showArrow={true}
        content="More options"
        color="default"
        delay={0}
        closeDelay={0}
        motionProps={{
          variants: {
            exit: {
              opacity: 0,
              transition: {
                duration: 0.1,
                ease: "easeIn",
              },
            },
            enter: {
              opacity: 1,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            },
          },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`${
            optionMenu ? `stroke-[${colorScheme[300]}]` : "stroke-stroke"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOptionMenu((prev) => !prev)}
        >
          <circle
            cx="12"
            cy="12"
            r="1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="6"
            cy="12"
            r="1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="18"
            cy="12"
            r="1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </Tooltip>
    </div>
  );
}

export default ColumnOptions;
