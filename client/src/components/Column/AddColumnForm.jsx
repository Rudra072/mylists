import React, { useState } from "react";
import { useAddColumnMutation } from "../../features/columnSlice/columnApiSlice";
import { useParams } from "react-router-dom";

function AddColumnForm({ adding, setAdding, theme }) {
  const [column, setColumn] = useState("");
  const [addColumn] = useAddColumnMutation();
  const { id } = useParams();

  const handleAdd = (e) => {
    e.preventDefault();
    if (e.key === "Enter" && column !== "") {
      const body = {
        title: column,
      };
      setColumn("");
      setAdding(false);
      addColumn({ id, body });
    }
  };

  const handleCancel = () => {
    setAdding(false);
    setColumn("");
  };

  return (
    <section className="flex flex-col">
      {adding && (
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <div
            className={`bg-backgroundSecondary flex text-textTertiary justify-between items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-[10px] p-[15px] mb-4`}
          >
            <input
              autoFocus
              type="text"
              name="column"
              value={column}
              placeholder="Column name"
              className={`bg-backgroundSecondary outline-none w-[135px]`}
              onKeyUp={handleAdd}
              onChange={(e) => setColumn(e.target.value)}
            />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              onClick={handleCancel}
              className="stroke-stroke hover:cursor-pointer"
            >
              <path
                d="M18 6L6 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </form>
      )}
      <button
        onClick={() => setAdding(true)}
        className={`bg-backgroundSecondary hover:bg-backgroundTertiary flex w-[250px] justify-center items-center rounded-[10px] px-[5px] py-[10px]`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth={1.5}
          className="stroke-stroke"
        >
          <path d="M12 6L12 18" strokeLinecap="round" />
          <path d="M18 12L6 12" strokeLinecap="round" />
        </svg>
        <p className="text-[15px] text-textSecondary">Add new column</p>
      </button>
    </section>
  );
}

export default AddColumnForm;
