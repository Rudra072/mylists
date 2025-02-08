import React from "react";
import { Tooltip } from "@nextui-org/tooltip";

function TaskOptions({ setOptionMenu, isWhite, handleBlur }) {
  return (
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
        onBlur={handleBlur}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className={`${
          isWhite ? "stroke-white" : "stroke-stroke"
        } cursor-pointer`}
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setOptionMenu((prev) => !prev)}
      >
        <circle cx="12" cy="12" r="1" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="6" cy="12" r="1" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="12" r="1" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Tooltip>
  );
}

export default TaskOptions;
