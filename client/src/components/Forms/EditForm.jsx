import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import ActionButton from "./ActionButton";
import { useEditTaskMutation } from "../../features/taskSlice/taskApiSlice";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";

function EditForm({ task, columnId, setEditMode }) {
  const { id } = useParams();
  const [checklist, setCheckList] = useState(
    task.checklist.length < 0 ? null : task.checklist
  );
  const [priority, setPriority] = useState(task.priority);
  const [subTask, setSubTask] = useState("");
  const [adding, setAdding] = useState(false);
  const [editTask] = useEditTaskMutation();
  const { data: pref } = useGetUserPreferenceQuery();
  const priorities = ["High", "Medium", "Low"];
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const { colorScheme: Red } = useGetColorVariants({ color: "Red" });
  const { colorScheme: Orange } = useGetColorVariants({ color: "Orange" });
  const { colorScheme: Green } = useGetColorVariants({ color: "Green" });

  const editForm = useFormik({
    initialValues: {
      estimate: task.estimate,
      priority: task.priority,
      tag: task.tag,
      description: task.description,
    },
    onSubmit: (values) => {
      const body = {
        estimate: values.estimate,
        priority: priority,
        tag: values.tag,
        description: values.description,
        checklist,
      };
      editTask({
        id,
        columnId,
        taskId: task._id,
        body,
      });
      setEditMode(false);
    },
  });

  const handleCheckList = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCheckList([...checklist, { title: subTask }]);
      setSubTask("");
      setAdding(false);
    }
  };

  const handleCheck = ({ id, index }) => {
    const updatedList = checklist.map((t, i) => {
      if (i === index) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setCheckList(updatedList);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <form
      className="flex flex-col gap-8"
      autoComplete="off"
      onSubmit={editForm.handleSubmit}
    >
      <section className="grid grid-cols-[repeat(2,minmax(0px,100px)_200px)] text-titleLG">
        <div className="flex flex-col gap-2">
          <label>Due Date</label>
          <label>Estimate</label>
          <label>Priority</label>
          <label>Tag</label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4.5 0.5V4.5M11.5 0.5V4.5" className="stroke-stroke" />
              <rect
                x="0.5"
                y="2.5"
                width="15"
                height="14"
                rx="3.5"
                className="stroke-stroke"
              />
              <path d="M1 6.5H15.5" className="stroke-stroke" />
              <rect x="4" y="10" width="2" height="1" className="fill-stroke" />
              <rect x="7" y="10" width="2" height="1" className="fill-stroke" />
              <rect
                x="10"
                y="10"
                width="2"
                height="1"
                className="fill-stroke"
              />
              <rect x="4" y="13" width="2" height="1" className="fill-stroke" />
              <rect x="7" y="13" width="2" height="1" className="fill-stroke" />
              <rect
                x="10"
                y="13"
                width="2"
                height="1"
                className="fill-stroke"
              />
            </svg>
            <p className="font-bold">{task?.duedate}</p>
          </div>
          <div className="flex gap-3">
            <svg
              width="25"
              height="25"
              viewBox="0 0 11 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-stroke"
              strokeWidth="1.3"
            >
              <path d="M5.5 8.5L9.02802 5.36398C9.64627 4.81443 10 4.02672 10 3.19953V2.70711C10 2.25435 9.82014 1.82014 9.5 1.5V1.5C9.17986 1.17986 8.74565 1 8.29289 1H2.70711C2.25435 1 1.82014 1.17986 1.5 1.5V1.5C1.17986 1.82014 1 2.25435 1 2.70711V3.19953C1 4.02672 1.35373 4.81443 1.97198 5.36398L5.5 8.5ZM5.5 8.5L1.70711 12.2929C1.25435 12.7456 1 13.3597 1 14V14.2929C1 14.7456 1.17986 15.1799 1.5 15.5V15.5C1.82014 15.8201 2.25435 16 2.70711 16H8.29289C8.74565 16 9.17986 15.8201 9.5 15.5V15.5C9.82014 15.1799 10 14.7456 10 14.2929V14C10 13.3597 9.74565 12.7456 9.29289 12.2929L5.5 8.5Z" />
            </svg>
            <input
              {...editForm.getFieldProps("estimate")}
              type="text"
              name="estimate"
              className={`bg-backgroundSecondary border-transparent focus:outline-none outline-none w-full`}
              placeholder="Add estimate"
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </div>
          <div className="flex gap-3 w-[500px]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-stroke"
              strokeWidth="1.3"
            >
              <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15" />
            </svg>
            <div className="flex gap-3">
              {priorities.map((p) => (
                <div>
                  {p === "High" && (
                    <div
                      className={`flex items-center gap-1 text-[${
                        Red[300]
                      }] border-2 border-[${
                        Red[300]
                      }] font-bold px-2 rounded-full text-titleMD ${
                        priority === p && `bg-[${Red[100]}]`
                      }`}
                      onClick={() => setPriority("High")}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`stroke-Red fill-[${Red[300]}]`}
                        strokeWidth="1.3"
                      >
                        <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15" />
                      </svg>
                      <p>{p}</p>
                    </div>
                  )}
                  {p === "Medium" && (
                    <div
                      className={`flex items-center gap-1 text-[${
                        Orange[300]
                      }] border-2 border-[${
                        Orange[300]
                      }] font-bold px-2 rounded-full text-titleMD ${
                        priority === p && `bg-[${Orange[100]}]`
                      }`}
                      onClick={() => setPriority("Medium")}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`stroke-Orange fill-[${Orange[300]}]`}
                        strokeWidth="1.3"
                      >
                        <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15" />
                      </svg>
                      <p>{p}</p>
                    </div>
                  )}
                  {p === "Low" && (
                    <div
                      className={`flex items-center gap-1 text-[${
                        Green[300]
                      }] border-2 border-[${
                        Green[300]
                      }] font-bold px-2 rounded-full text-titleMD ${
                        priority === p && `bg-[${Green[100]}]`
                      }`}
                      onClick={() => setPriority("Low")}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`stroke-Green fill-[${Green[300]}]`}
                        strokeWidth="1.3"
                      >
                        <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15" />
                      </svg>
                      <p>{p}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <svg
              width="22"
              height="22"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="1.5"
              className="stroke-stroke"
            >
              <path d="M16 8.5C16 13.518 10.5117 16.9027 8.92489 17.7764C8.65683 17.924 8.34317 17.924 8.07511 17.7764C6.48831 16.9027 1 13.518 1 8.5C1 4 4.63401 1 8.5 1C12.5 1 16 4 16 8.5Z" />
              <circle cx="8.5" cy="8.5" r="3.5" />
            </svg>
            <input
              {...editForm.getFieldProps("tag")}
              type="text"
              name="tag"
              className={`bg-backgroundSecondary border-transparent focus:outline-none outline-none w-full`}
              placeholder="Add custom tag"
              onKeyDown={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-2 text-titleLG">
        <label>Description</label>
        <textarea
          {...editForm.getFieldProps("description")}
          name="description"
          cols="30"
          rows="5"
          placeholder="write something..."
          className={`bg-backgroundSecondary border-border border-2 outline-none rounded-[5px] p-[10px] resize-none`}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2 text-titleLG">
        <label>Checklist</label>
        <div
          onClick={() => setAdding(true)}
          className={`stroke-stroke bg-backgroundTertiary text-textSecondary hover:text-textTertiary flex w-max mb-2 px-2 py-1 justify-center items-center rounded-[10px] `}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            strokeWidth={1.5}
            className=""
          >
            <path d="M12 6L12 18" strokeLinecap="round" />
            <path d="M18 12L6 12" strokeLinecap="round" />
          </svg>
          <p className="text-button">Add checklist item</p>
        </div>
        <div className="grid grid-cols-3 gap-3 h-[45px] overflow-auto scrollbar">
          {checklist.length > 0
            ? checklist.map((c, index) => (
                <div className="flex gap-3 items-center">
                  <div
                    onClick={() => handleCheck({ id: c._id, index })}
                    className={`bg-[${
                      c.completed && colorScheme && colorScheme[300]
                    }] w-[23px] h-[23px] border-2 border-[${
                      colorScheme && colorScheme[300]
                    }] rounded-full flex justify-center items-center text-White text-[12px]`}
                  >
                    {c.completed && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <p
                    className={`text-bodyMD ${
                      c.completed && "text-textSecondary"
                    }`}
                  >
                    {c.title}
                  </p>
                </div>
              ))
            : null}
          {adding && (
            <div className="flex gap-3">
              <div
                className={`w-[23px] h-[23px] border-2 border-[${
                  colorScheme && colorScheme[300]
                }] rounded-full flex justify-center items-center text-White text-[12px]`}
              ></div>
              <div className="flex">
                <input
                  autoFocus
                  type="text"
                  name="estimate"
                  className={`bg-backgroundSecondary border-transparent focus:outline-none outline-none text-bodyMD`}
                  placeholder="Add subtasks"
                  onKeyDown={handleCheckList}
                  value={subTask}
                  onChange={(e) => setSubTask(e.target.value)}
                />
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke-width="1.5"
                  onClick={() => setAdding(false)}
                  class="stroke-stroke"
                >
                  <path
                    d="M18 6L6 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M6 6L18 18"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        <ActionButton setEditMode={setEditMode} handleCancel={handleCancel} />
      </div>
    </form>
  );
}

export default EditForm;
