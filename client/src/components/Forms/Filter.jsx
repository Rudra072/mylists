import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { setFilters } from "../../features/authSlice/authSlice";
import { useDispatch } from "react-redux";

const Filter = ({ clicked, disable }) => {
  const { id } = useParams();
  const [filter, setFilter] = useState(["None"]);
  const dispatch = useDispatch();
  const items = [
    { label: "High", color: "Red", width: 20, height: 20 },
    { label: "Medium", color: "Orange", width: 20, height: 20 },
    { label: "Low", color: "Green", width: 20, height: 20 },
    {
      label: "None",
      color: "stroke-stroke",
      width: 24,
      height: 24,
      isCircle: true,
    },
  ];
  // Serializing the filter array into a query string
  const filters =
    filter.length === 0
      ? ""
      : Object.entries(filter)
          .map(
            ([key, value]) =>
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
          )
          .join("&");

  const getFilters = (item) => {
    setFilter((prevFilters) => {
      let newFilters;

      if (item === "None") {
        newFilters = ["None"];
      } else {
        newFilters = prevFilters.includes(item)
          ? prevFilters.filter((p) => p !== item)
          : [...prevFilters.filter((p) => p !== "None"), item];
      }
      return newFilters;
    });
  };
  useEffect(() => {
    dispatch(setFilters({ filters }));
  }, [filter, dispatch]);

  return (
    <div
      className={`w-[210px] z-50 p-3 cursor-default text-textTertiary top-[7%] right-[1%] absolute bg-backgroundSecondary shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[10px] ${
        clicked ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => getFilters(item.label)}
            className={`flex gap-5 items-center cursor-pointer hover:bg-backgroundTertiary rounded-[7px] px-4 py-[10px] ${
              disable && "pointer-events-none"
            }`}
          >
            {item.isCircle ? (
              <svg
                width={item.width}
                height={item.height}
                viewBox="2 0 24 24"
                fill="none"
                strokeWidth="1.8"
                xmlns="http://www.w3.org/2000/svg"
                className={item.color}
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M18 18L6 6" />
              </svg>
            ) : (
              <svg
                width={item.width}
                height={item.height}
                viewBox="0 0 12 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`stroke-${item.color}`}
                strokeWidth="1.3"
              >
                <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15" />
              </svg>
            )}
            <div className="flex w-full justify-between">
              <p>{item.label}</p>
              {filters.includes(item.label) && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-stroke block"
                >
                  <path
                    d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
