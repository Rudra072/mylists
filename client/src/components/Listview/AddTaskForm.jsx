import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DateInput } from "@nextui-org/date-input";
import { parseDate } from "@internationalized/date";
import useConvertDate from "../../customHooks/useConvertDate";
import { useAddTaskMutation } from "../../features/taskSlice/taskApiSlice";
import toast, { Toaster } from "react-hot-toast";

const AddTaskForm = ({
  adding,
  handleCancel,
  setAdding,
  column,
  ringColor,
}) => {
  const { id } = useParams();
  const [addTask] = useAddTaskMutation();
  const defaultDate = new Date().toISOString().split("T")[0];
  const [dueDate, setDueDate] = useState(parseDate(defaultDate));
  const [task, setTask] = useState("");
  const { day = undefined, month: dueMonthIndex = undefined } = dueDate || {};
  const { dueMonth } = useConvertDate({ dueMonthIndex });
  const duedate = `${day} ${dueMonth}`;
  // console.log(ringColor);

  const handleAdd = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const body = {
      title: task,
      createdAt: date,
      duedate,
    };
    if (e.key === "Enter" && task !== "" && dueDate !== null) {
      await addTask({
        id,
        columnId: column._id,
        body,
      });
      setTask("");
      setAdding(false);
      setDueDate(parseDate(defaultDate));
      toast.success("Task added successfully!");
    }
  };

  return (
    <>
      {adding && (
        <form
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
          className="flex justify-start items-center border-t border-border"
        >
          <div
            className={`bg-backgroundSecondary flex text-textSecondary w-min justify-between items-center rounded-[10px] p-[15px] gap-[35px] ml-[30px]`}
          >
            <input
              autoFocus
              type="text"
              name="column"
              value={task}
              placeholder="Task name"
              className={`outline-none bg-backgroundPrimary w-[150px] focus:ring-2 focus:ring-${ringColor} rounded-[10px] p-[10px]`}
              onKeyUp={handleAdd}
              onChange={(e) => setTask(e.target.value)}
            />
            <DateInput
              onKeyUp={handleAdd}
              defaultValue={parseDate(defaultDate)}
              onChange={setDueDate}
              value={dueDate}
              className="w-min"
              variant="underlined"
              label="Due date"
              errorMessage=" "
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
      <Toaster position="bottom-right" reverseOrder="false" />
    </>
  );
};

export default AddTaskForm;
