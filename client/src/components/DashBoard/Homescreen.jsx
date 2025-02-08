import React, { useEffect } from "react";
import Boards from "./Boards";
import CustomizeForm from "../Forms/ThemePreference/CustomizeForm";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useConvertDate from "../../customHooks/useConvertDate";
import { useGetAllTasksQuery } from "../../features/taskSlice/taskApiSlice";
import useFindTotalCompTasks from "../../customHooks/useFindTotalCompTasks";
import Logout from "../auth/Logout";

function Homescreen() {
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const { date, month, year, dayName } = useConvertDate({ data: pref });
  const theme = pref?.theme;
  const { data: tasks } = useGetAllTasksQuery();
  const { totalTasks, completedTasks } = useFindTotalCompTasks({ tasks });

  useEffect(() => {
    const root = document.querySelector(".root");
    if (theme === "Light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  return (
    <div className={`text-textTertiary w-full`}>
      <section
        className={`
          bg-backgroundSecondary border-border
         flex justify-between items-center p-[15px] border-b-[1.5px] relative`}
      >
        <div>
          <h1 className="-tracking-[.5px] font-bold text-[20px] mb-[10px]">
            {pref?.workspaceTitle}
          </h1>
          <p className="-tracking-[.1px] text-textSecondary text-[14px]">
            Your main workspace to manage all boards.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Logout />
          <CustomizeForm pref={pref} />
        </div>
      </section>
      <section className="px-[20px] py-[30px] bg-backgroundPrimary">
        <section className="bg-cover w-[100%] py-[80px] flex justify-center items-center rounded-[10px] mb-[50px] -tracking-[.5px]">
          <div className="flex justify-center items-center flex-col gap-[20px]">
            <div className="flex justify-center items-center gap-[50px] text-[14px]">
              <div className="flex justify-center items-center gap-[10px]">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="stroke-stroke"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="7.5" />
                  <path
                    d="M12 8V11.8964C12 11.9628 12.0263 12.0263 12.0732 12.0732L14.5 14.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p>07:30</p>
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 0.5V4.5M11.5 0.5V4.5"
                    className="stroke-stroke"
                  />
                  <rect
                    x="0.5"
                    y="2.5"
                    width="15"
                    height="14"
                    rx="3.5"
                    className="stroke-stroke"
                  />
                  <path d="M1 6.5H15.5" className="stroke-stroke" />
                  <rect
                    x="4"
                    y="10"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                  <rect
                    x="7"
                    y="10"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                  <rect
                    x="4"
                    y="13"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                  <rect
                    x="7"
                    y="13"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                  <rect
                    x="10"
                    y="13"
                    width="2"
                    height="1"
                    className="fill-stroke"
                  />
                </svg>
                <p>
                  {dayName}, {month} {date}
                </p>
              </div>
            </div>
            <h1 className="font-semibold text-[28px] -tracking-[1px] bf">
              Good morning, {pref?.workspaceUsername}
            </h1>
            <div
              className={`flex justify-center items-center gap-[50px] text-[14px] bg-backgroundOptional px-[30px] py-[10px] rounded-[25px]`}
            >
              <div className="flex justify-center items-center gap-[10px]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-stroke"
                  strokeWidth=".8"
                >
                  <path d="M6 2.5H14M6 7.5H14M6 12.5H14" />
                  <path d="M3.5 1L1.5 3.5L0.5 2.5" strokeLinecap="square" />
                  <path d="M3.5 6L1.5 8.5L0.5 7.5" strokeLinecap="square" />
                  <path d="M3.5 11L1.5 13.5L0.5 12.5" strokeLinecap="square" />
                </svg>
                <p>{totalTasks} tasks total</p>
              </div>
              <div className="flex justify-center items-center gap-[10px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-stroke"
                >
                  <circle cx="10" cy="10" r="9" />
                  <path d="M6 10L9 13L14 7" />
                </svg>
                <p>{completedTasks} tasks completed</p>
              </div>
            </div>
          </div>
        </section>
        <Boards theme={theme} />
      </section>
    </div>
  );
}

export default Homescreen;
