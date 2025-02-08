import React, { useState } from "react";

function SelectRole({ roles, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const clearOptions = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  const selectOption = (role) => {
    onChange(role);
  };

  return (
    <div>
      <h1 className="font-bold mb-[10px] text-[14px]">Role</h1>

      <div className="relative">
        <div
          onBlur={() => setIsOpen(false)}
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-white border-[1.5px] w-full py-[8px] px-[20px] border-300 text-1000 rounded-[10px] flex justify-between items-center"
        >
          {value ? (
            value
          ) : (
            <p className="text-[14px] text-500" aria-disabled>
              Choose your own role
            </p>
          )}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => {
              e.stopPropagation();
              clearOptions();
            }}
          >
            <path
              d="M18 6L6 18"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <ul
          className={`absolute inset-x-0 top-0 mt-[50px] bg-White border-[1.5px] border-300 py-[8px] px-[20px] rounded-[10px] flex justify-center flex-col gap-[1rem] ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {roles.map((role) => (
            <li
              onClick={() => {
                selectOption(role.name);
                setIsOpen(false);
              }}
              key={role.name}
              className="cursor-pointer"
            >
              {role.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SelectRole;
