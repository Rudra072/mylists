import React from "react";

const SubmitButton = ({ text, isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`disabled:opacity-80 flex cursor-pointer justify-center leading-other items-center gap-[25px] bg-Blue px-[20px] py-[10px] rounded-[25px]`}
    >
      <p className="text-white">{text}</p>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.2929 5.29289C14.6834 4.90237 15.3166 4.90237 15.7071 5.29289L21.7071 11.2929C22.0976 11.6834 22.0976 12.3166 21.7071 12.7071L15.7071 18.7071C15.3166 19.0976 14.6834 19.0976 14.2929 18.7071C13.9024 18.3166 13.9024 17.6834 14.2929 17.2929L18.5858 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H18.5858L14.2929 6.70711C13.9024 6.31658 13.9024 5.68342 14.2929 5.29289Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default SubmitButton;
