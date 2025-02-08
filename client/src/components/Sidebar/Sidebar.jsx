import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "./Switch";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { useGetBoardsQuery } from "../../features/boardSlice/boardApiSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const { data: myBoards } = useGetBoardsQuery();
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const theme = pref?.theme;
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const [clicked, setClicked] = useState(null);

  const HoverLink = ({ id, children, index }) => (
    <Link to={id}>
      <div
        onClick={() => setClicked(index)}
        className={`flex items-center gap-[20px] cursor-pointer ${
          clicked === index &&
          `bg-800 text-[${colorScheme && colorScheme[300]}] fill-[${
            colorScheme && colorScheme[300]
          }] stroke-none`
        } ${
          clicked !== index && "fill-none"
        } ${`hover:bg-800 stroke-200 hover:stroke-none hover:text-[${
          colorScheme && colorScheme[300]
        }] hover:fill-[${
          colorScheme && colorScheme[300]
        }]`} text-100 p-[15px] rounded-full`}
      >
        {children}
      </div>
    </Link>
  );

  return (
    <section
      className={`bg-900 p-[20px] flex justify-between items-start flex-col  ${
        theme === "Dark" ? " border-r border-border" : "border-r border-transparent"
      }`}
    >
      <div className="flex justify-center flex-col gap-[2rem] w-full">
        <div className="flex items-center justify-start">
          <svg
            width="50"
            height="50"
            viewBox="0 0 412 396"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M174.159 119.686C174.171 119.44 174.163 119.187 174.143 118.941C172.748 102.173 190.132 97.5144 197.308 112.733C197.413 112.956 197.534 113.181 197.668 113.388L227.517 159.638L276.482 157.426C293.682 155.725 298.669 174.339 282.924 181.467L239.815 205.536L237.09 260.514C237.078 260.761 237.086 261.015 237.106 261.261C238.5 278.029 221.116 282.687 213.94 267.467C213.835 267.245 213.715 267.021 213.582 266.814L183.757 220.557L135.116 221.072C117.916 222.772 112.928 204.158 128.674 197.031L171.458 174.659L174.159 119.686Z"
              className="scale-110"
              fill={`${colorScheme && colorScheme[300]}`}
            />
          </svg>
          <h1 className="text-white text-headingH1 leading-heading font-light">
            <span className={`text-[${colorScheme && colorScheme[300]}]`}>
              my
            </span>
            lists
          </h1>
        </div>
        <div className="flex flex-col gap-[10px]">
          <HoverLink index="-1">
            <svg
              width="25"
              height="25"
              viewBox="0 0 10 9"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth=".5"
            >
              <path d="M8.3 0.9H6.7C6.25817 0.9 5.9 1.25817 5.9 1.7V3.3C5.9 3.74183 6.25817 4.1 6.7 4.1H7.5H8.3C8.74183 4.1 9.1 3.74183 9.1 3.3V1.7C9.1 1.25817 8.74183 0.9 8.3 0.9Z" />
              <path d="M8.3 4.9H6.7C6.25817 4.9 5.9 5.25817 5.9 5.7V7.3C5.9 7.74183 6.25817 8.1 6.7 8.1H8.3C8.74183 8.1 9.1 7.74183 9.1 7.3V5.7C9.1 5.25817 8.74183 4.9 8.3 4.9Z" />
              <rect x="0.9" y="0.9" width="4.2" height="7.2" rx="1.1" />
            </svg>
            <h1>{pref && pref.workspaceTitle}</h1>
          </HoverLink>
          {myBoards?.map((board, index) => (
            <HoverLink
              id={`${board._id}`}
              key={board._id}
              index={index}
              name={board.title}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 6 8"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke"
              >
                <path
                  d="M1.73777 6.97275C2.08242 6.74323 2.51674 6.38203 3.12926 5.8716L3.12926 5.8716L3.8412 5.27832C4.21361 4.96798 4.46877 4.75468 4.64562 4.57318C4.81887 4.3954 4.87883 4.28519 4.90159 4.19427C4.93352 4.06673 4.93352 3.93327 4.90159 3.80573C4.87883 3.71481 4.81887 3.6046 4.64563 3.42682C4.46877 3.24532 4.21361 3.03203 3.8412 2.72168L3.12927 2.12841C2.51674 1.61797 2.08243 1.25677 1.73777 1.02725C1.38572 0.792812 1.21029 0.754922 1.10355 0.767885C0.934204 0.788452 0.775864 0.862614 0.65165 0.979544C0.573358 1.05325 0.490162 1.21227 0.444886 1.63281C0.400561 2.04451 0.4 2.6094 0.4 3.40673V4.59327C0.4 5.3906 0.400561 5.95549 0.444886 6.36719C0.490162 6.78773 0.573358 6.94675 0.65165 7.02046C0.775864 7.13739 0.934204 7.21155 1.10355 7.23211C1.21029 7.24508 1.38572 7.20719 1.73777 6.97275ZM3.38503 6.17852L3. 6.17889L3.38503 6.17852Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1>{board.title}</h1>
            </HoverLink>
          ))}
        </div>
      </div>
      <Switch pref={pref} colorScheme={colorScheme} />
    </section>
  );
}

export default Sidebar;
