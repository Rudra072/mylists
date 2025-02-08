import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddTaskMutation } from "../../features/taskSlice/taskApiSlice";
import toast, { Toaster } from "react-hot-toast";
import { Calendar } from "@nextui-org/calendar";
import PinTask from "./PinTask";
import { today, getLocalTimeZone } from "@internationalized/date";
import useConvertDate from "../../customHooks/useConvertDate";

function AddTaskForm({ adding, setAdding, pref, column }) {
  const { id } = useParams();
  const [task, setTask] = useState("");
  const [addTask] = useAddTaskMutation();
  const [dueDate, setDueDate] = useState(today(getLocalTimeZone()));
  const [pinTask, setPinTask] = useState(false);
  const [settingDate, setSettingDate] = useState(false);
  const day = dueDate?.day;
  const dueMonthIndex = dueDate?.month;
  const { dueMonth } = useConvertDate({ dueMonthIndex });
  const duedate = `${day} ${dueMonth}`;

  const handleAdd = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const body = {
      title: task,
      createdAt: date,
      duedate,
      pinned: pinTask,
    };
    if (e.key === "Enter" && task !== "") {
      await addTask({
        id,
        columnId: column._id,
        body,
      });
      setTask("");
      setAdding(false);
      setSettingDate(false);
      toast.success("Task added successfully!");
    }
  };

  const handleCancel = () => {
    setAdding(false);
    setSettingDate(false);
    setDueDate(today(getLocalTimeZone()));
  };

  const handlePinTask = () => {
    setPinTask((prev) => !prev);
  };

  return (
    <>
      {adding && (
        <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
          <div className="mb-4">
            <div
              className={`bg-backgroundSecondary text-textTertiary flex justify-between items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-t-[10px] p-[15px] mb-[3px]`}
            >
              <input
                autoFocus
                type="text"
                name="task"
                placeholder="Task name"
                className={`bg-backgroundSecondary outline-none w-[135px]`}
                onKeyUp={handleAdd}
                onChange={(e) => setTask(e.target.value)}
              />
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="stroke-stroke"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="1.5"
                onClick={handleCancel}
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
            <PinTask
              column={column}
              handlePinTask={handlePinTask}
              pin={pinTask}
              setSettingDate={setSettingDate}
              settingDate={settingDate}
              dueDate={dueDate}
              setDueDate={setDueDate}
              addForm="true"
              day={day}
              dueMonth={dueMonth}
              pref={pref}
            />
          </div>
        </form>
      )}
      {settingDate && (
        <Calendar
          calendarWidth={"250px"}
          aria-label="Date (Controlled)"
          value={dueDate}
          onChange={setDueDate}
          className="absolute"
          color="primary"
        />
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
        <p className="text-[15px] text-textSecondary">Add new task</p>
      </button>
      <Toaster position="bottom-right" reverseOrder="false" />
    </>
  );
}

export default AddTaskForm;
