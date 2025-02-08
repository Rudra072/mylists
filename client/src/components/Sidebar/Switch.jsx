import React, { useState, useRef, useEffect } from "react";
import { useUpdatePreferenceMutation } from "../../features/authSlice/authApiSlice";

function Switch({ colorScheme, pref }) {
  let theme = pref?.theme;
  const [mode, setMode] = useState(theme);
  const circle = useRef();
  const [updatePreference] = useUpdatePreferenceMutation();
  const root = document.querySelector(".root");

  useEffect(() => {
    if (theme === "Dark") {
      circle.current.classList.remove("left");
      circle.current.classList.add("right");
      setMode(theme);
    }
    if (theme === "Light") {
      circle.current.classList.remove("right");
      circle.current.classList.add("left");
      setMode(theme);
    }
  }, [theme]);

  const animate = () => {
    circle.current.classList.add("stretch");
    setTimeout(() => {
      if (mode === "Light") {
        circle.current.classList.remove("right");
        circle.current.classList.remove("left");
        circle.current.classList.add("right");
        root.classList.remove("light");
        root.classList.add("dark");
        updatePreference({ theme: "Dark" });
      } else {
        circle.current.classList.remove("right");
        circle.current.classList.add("left");
        root.classList.remove("dark");
        root.classList.add("light");
        updatePreference({ theme: "Light" });
      }
      circle.current.classList.remove("stretch");
      setMode(mode === "Light" ? "Dark" : "Light");
    }, 500);
  };

  return (
    <div className="flex justify-center items-center gap-[20px]">
      <h1 className="text-400 text-[14px]">Light</h1>
      <div
        className="bg-800 min-h-[45px] rounded-[30px] flex justify-around items-center p-[6px]"
        onClick={animate}
      >
        <div className="flex justify-between items-center w-[70px] rounded-[30px] container relative px-[2px] z-[0]">
          <span
            ref={circle}
            className={`bg-[${
              colorScheme && colorScheme[300]
            }] h-[35px] w-[35px] rounded-full absolute circle -z-[1] left`}
          ></span>
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 23.5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="z-[1] cursor-pointer"
          >
            <circle
              cx="12"
              cy="12"
              r="4"
              fill={`${mode === "Light" ? "#D9D9D9" : ""}`}
              stroke="#D9D9D9"
            />
            <path d="M12 7V4" stroke="#D9D9D9" />
            <path d="M12 20V17" stroke="#D9D9D9" />
            <path d="M8.12132 8.12132L6 6" stroke="#D9D9D9" />
            <path d="M18.1213 18.1213L16 16" stroke="#D9D9D9" />
            <path d="M17 12L18.5 12L20 12" stroke="#D9D9D9" />
            <path d="M4 12L7 12" stroke="#D9D9D9" />
            <path d="M16 8.12108L18.1216 6" stroke="#D9D9D9" />
            <path d="M6.00002 18.1213L8.12134 16" stroke="#D9D9D9" />
          </svg>
          <svg
            width="25"
            height="25"
            viewBox="0 0 70 60"
            xmlns="http://www.w3.org/2000/svg"
            className="z-[1] cursor-pointer"
            fill={`${mode === "Dark" ? "#D9D9D9" : "none"}`}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              strokeWidth="2.5"
              d="M54.2261 48.528C55.1793 47.4351 54.0035 45.877 52.5882 46.193C50.4374 46.6732 48.2011 46.9265 45.9055 46.9265C29.0423 46.9265 15.3719 33.2562 15.3719 16.393C15.3719 11.9955 16.3016 7.81511 17.975 4.03767C18.5624 2.71182 17.2652 1.25587 16.0081 1.97879C6.84438 7.24852 0.673828 17.1369 0.673828 28.4664C0.673828 45.3297 14.3442 59 31.2074 59C40.3916 59 48.6287 54.9451 54.2261 48.528Z"
              stroke="#D9D9D9"
            />
            <path
              d="M40.2094 20.8142C40.6783 20.208 41.6269 20.3328 41.9229 21.0398L43.5914 25.0248C43.6998 25.2837 43.9121 25.4852 44.1764 25.5799L48.2432 27.0375C48.9647 27.2961 49.1391 28.2368 48.5582 28.7368L45.2839 31.5551C45.0711 31.7382 44.9451 32.0024 44.9367 32.283L44.8071 36.6012C44.7842 37.3673 43.9434 37.8238 43.2884 37.4259L39.5962 35.1827C39.3563 35.0369 39.0661 34.9987 38.7966 35.0774L34.6497 36.2886C33.914 36.5035 33.22 35.8449 33.3961 35.099L34.3885 30.8944C34.453 30.6211 34.3997 30.3334 34.2416 30.1014L31.8082 26.5317C31.3765 25.8985 31.7883 25.0349 32.5522 24.9719L36.8577 24.6165C37.1375 24.5934 37.3947 24.4537 37.5664 24.2316L40.2094 20.8142Z"
              stroke="#D9D9D9"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-400 text-[14px]">Dark</h1>
    </div>
  );
}

export default Switch;
