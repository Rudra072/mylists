import React from "react";
import { Tooltip } from "@nextui-org/tooltip";

const useToolTip = ({ children, content }) => {
  const uploadImage = (
    <Tooltip
      showArrow={true}
      content={content}
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
      {children}
    </Tooltip>
  );
  return { uploadImage };
};

export default useToolTip;
