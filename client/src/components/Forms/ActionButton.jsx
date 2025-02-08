import React from "react";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";

const ActionButton = ({ handleCancel }) => {
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  return (
    <div className="flex justify-end">
      <div className="flex gap-2">
        <div className="cursor-pointer border border-300 w-min px-[15px] py-[5px] rounded-[25px] text-[14px]">
          <button type="button" className="text-500" onClick={handleCancel}>
            Cancel
          </button>
        </div>
        <div
          className={`cursor-pointer bg-[${
            colorScheme && colorScheme[300]
          }] w-min px-[15px] py-[5px] rounded-[25px] text-[14px]`}
        >
          <button type="submit" className="text-white">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButton;
