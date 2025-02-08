import React, { useState, useEffect } from "react";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { useParams } from "react-router-dom";
import { useGetBoardQuery } from "../../features/boardSlice/boardApiSlice";
import Filter from "../Forms/Filter";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function WorkspaceNav() {
  const { id } = useParams();
  const location = useLocation();
  const isListView = location.pathname.includes("listview");
  const [disable, setDisable] = useState(true);
  const [clicked, setClicked] = useState(false);
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const { data: board } = useGetBoardQuery({ id });
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const theme = pref?.theme;

  useEffect(() => {
    if (board?.columns?.length === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [disable, board]);

  return (
    <section
      className={`border-border text-textSecondary bg-backgroundSecondary flex justify-between items-center border-b px-[15px]`}
    >
      <div className="flex items-center gap-[25px]">
        <h1 className={`text-textTertiary font-bold text-headingH2`}>
          {board?.title}
        </h1>
        <Link to={`/dashboard/${id}`}>
          <div
            className={`flex items-center gap-[8px] py-[20px]  ${
              !isListView &&
              `border-b-[2px] border-[${colorScheme && colorScheme[300]}]`
            } text-[${
              theme === "Light" && !isListView
                ? colorScheme && colorScheme[300]
                : ""
            }]`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 15"
              fill="none"
              className="stroke-stroke"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.2"
            >
              <path d="M6.5 1H2C1.44772 1 1 1.44772 1 2V13.5C1 14.0523 1.44772 14.5 2 14.5H6.5C7.05228 14.5 7.5 14.0523 7.5 13.5V2C7.5 1.44772 7.05228 1 6.5 1Z" />
              <path d="M14.5 1H11C10.4477 1 10 1.44772 10 2V9C10 9.55229 10.4477 10 11 10H14.5C15.0523 10 15.5 9.55229 15.5 9V2C15.5 1.44772 15.0523 1 14.5 1Z" />
            </svg>
            <h1>Board view</h1>
          </div>
        </Link>
        <Link to={`/dashboard/${id}/listview`}>
          <div
            className={`flex items-center gap-[8px] py-[20px]  ${
              isListView &&
              `border-b-[2px] border-[${colorScheme && colorScheme[300]}]`
            } text-[${
              theme === "Light" && isListView
                ? colorScheme && colorScheme[300]
                : ""
            }]`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-stroke"
            >
              <path d="M6 2.5H14M6 7.5H14M6 12.5H14" />
              <path d="M3.5 1L1.5 3.5L0.5 2.5" strokeLinecap="square" />
              <path d="M3.5 6L1.5 8.5L0.5 7.5" strokeLinecap="square" />
              <path d="M3.5 11L1.5 13.5L0.5 12.5" strokeLinecap="square" />
            </svg>
            <h1>List view</h1>
          </div>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-[15px] cursor-pointer">
        <Filter clicked={clicked} disable={disable} />
        <svg
          width="18"
          height="18"
          viewBox="0 0 14 9"
          ś
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-stroke"
          strokeWidth="1.2"
        >
          <path d="M2.5 4H11.5M1 0.5H13.5M5.5 8H8.5" strokeLinecap="round" />
        </svg>
        <p className="text-[16px] font-medium select-none">Filter</p>
        <div onClick={() => setClicked((prev) => !prev)}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-stroke"
          >
            <path
              d="M18 9L12.3536 14.6464C12.1583 14.8417 11.8417 14.8417 11.6464 14.6464L6 9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceNav;
