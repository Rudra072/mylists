import React from "react";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";

function OptionMenu({
  optionMenu,
  handleEditMode,
  handleDelete,
  data,
  option1,
  option2,
  top,
  left,
}) {
  const { data: pref, isSuccess } = useGetUserPreferenceQuery();

  return (
    <div
      style={{ left: `${left}`, top: `${top}` }}
      className={`${
        optionMenu ? "block" : "hidden"
      } absolute select-none z-10 bg-backgroundSecondary rounded-[10px] p-[10px] w-[200px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
    >
      <div>
        <div
          onClick={handleEditMode}
          className={`hover:bg-optionMenuHover text-textTertiary flex items-center py-[10px] pr-[30px] gap-[10px] rounded-[8px] pl-[20px] cursor-pointer`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-stroke"
            strokeWidth="1.5"
          >
            <path d="M3.63822 15.8064L4.07316 16.0392L3.63822 15.8064C3.46299 16.1338 3.39038 16.4975 3.28577 17.0216C3.28131 17.0439 3.27678 17.0666 3.27219 17.0895L2.6568 20.1665C2.65511 20.1749 2.65341 20.1834 2.65169 20.192C2.62293 20.3354 2.59143 20.4925 2.58471 20.6253C2.5771 20.7758 2.59329 21.0166 2.78836 21.2116C2.98342 21.4067 3.22416 21.4229 3.37468 21.4153C3.50744 21.4086 3.66454 21.3771 3.808 21.3483C3.81655 21.3466 3.82505 21.3449 3.83349 21.3432L6.91047 20.7278C6.93341 20.7232 6.95605 20.7187 6.9784 20.7142C7.50243 20.6096 7.8662 20.537 8.19362 20.3618C8.52103 20.1866 8.78322 19.9242 9.16093 19.5462C9.17705 19.5301 9.19338 19.5137 9.20993 19.4972L19.3536 9.35356C19.3765 9.3306 19.3991 9.30799 19.4214 9.28571C19.901 8.80649 20.2288 8.47904 20.4116 8.11004C20.7582 7.4106 20.7582 6.5894 20.4116 5.88996C20.2288 5.52097 19.901 5.19351 19.4214 4.71429C19.3991 4.69201 19.3765 4.6694 19.3536 4.64645C19.3306 4.62349 19.308 4.60086 19.2857 4.57856C18.8065 4.09895 18.479 3.77123 18.11 3.58838C17.4106 3.24178 16.5894 3.24178 15.89 3.58838C15.521 3.77123 15.1935 4.09896 14.7143 4.57857C14.692 4.60087 14.6694 4.6235 14.6464 4.64645L4.50283 14.7901C4.48627 14.8066 4.46993 14.823 4.4538 14.8391C4.07583 15.2168 3.81344 15.479 3.63822 15.8064Z" />
            <path d="M13 6V6C13.5176 8.24307 15.1653 10.0551 17.3492 10.7831L18 11" />
          </svg>
          <h1>{option1}</h1>
        </div>
        <div
          onClick={() => handleDelete({ taskColumnId: data._id })}
          className={`hover:bg-optionMenuHover text-textTertiary flex items-center py-[10px] pr-[30px] gap-[10px] rounded-[8px] pl-[20px] cursor-pointer`}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 37 37"
            fill="none"
            className="stroke-stroke"
            strokeWidth="2.8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.5 11.5L6.6265 31.9144C6.83876 33.9521 8.55628 35.5 10.605 35.5H26.395C28.4437 35.5 30.1612 33.9521 30.3735 31.9144L32.5 11.5M0.5 8H10.5M37 8H26.5M10.5 8L11.2547 2.71716C11.3954 1.73186 12.2393 1 13.2346 1H23.7654C24.7607 1 25.6046 1.73186 25.7453 2.71716L26.5 8M10.5 8H26.5" />
          </svg>
          <h1>{option2}</h1>
        </div>
      </div>
    </div>
  );
}

export default OptionMenu;
