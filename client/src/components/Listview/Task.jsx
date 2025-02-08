import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import TaskOptions from "../Task/TaskOptions";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { useEditTaskMutation } from "../../features/taskSlice/taskApiSlice";
import { useDeleteTaskMutation } from "../../features/taskSlice/taskApiSlice";
import EditTask from "../Task/EditTask/EditTask";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Task({ task, theme, pref, columnId, column, expandColumn }) {
  gsap.registerPlugin(useGSAP);
  const { id } = useParams();
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [editMode, setEditMode] = useState(false);
  const [optionMenu, setOptionMenu] = useState(false);
  const [expandTask, setExpandTask] = useState(true);
  const [checklist, setCheckList] = useState(task?.checklist);
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const { colorScheme: Red } = useGetColorVariants({ color: "Red" });
  const { colorScheme: Orange } = useGetColorVariants({ color: "Orange" });
  const { colorScheme: Green } = useGetColorVariants({ color: "Green" });
  const container = useRef();

  const handleCheck = ({ id, index }) => {
    const updatedList = checklist.map((t, i) => {
      if (i === index) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setCheckList(updatedList);
    const body = {
      estimate: task.estimate,
      priority: task.priority,
      tag: task.tag,
      description: task.description,
      checklist: updatedList,
    };
    setTimeout(() => {
      editTask({
        id,
        columnId,
        taskId: task._id,
        body,
      });
    }, 1500);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (expandTask) {
        tl.to(container.current, { height: "auto", duration: 0.5 });
      } else {
        tl.to(container.current, { height: "3rem", duration: 0.5 });
      }
    },
    {
      dependencies: [expandTask],
      scope: container,
    }
  );

  const handleExpand = () => {
    !setExpandTask((prev) => !prev);
  };

  const handleDeleteTask = ({ taskColumnId }) => {
    deleteTask({
      id,
      columnId: column._id,
      taskColumnId,
    });
    setOptionMenu(false);
  };
  const handleEditTask = () => {
    setEditMode(true);
    setOptionMenu(false);
  };

  return (
    <section
      ref={container}
      className={`overflow-hidden ${
        !expandColumn && "opacity-0 transition-all duration-500"
      }`}
    >
      {editMode && (
        <EditTask
          task={task}
          setEditMode={setEditMode}
          columnId={column._id}
          theme={theme}
        />
      )}
      <div className="grid grid-cols-[1fr_50px_minmax(150px,_150px)_150px_150px_250px_50px] items-center border-t border-border p-3 pl-[40px] relative">
        <div className="flex items-center justify-between pr-[.75rem] text-bodyMD">
          <div className="flex items-center gap-2">
            <svg
              onClick={handleExpand}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class={`stroke-stroke cursor-pointer ${
                expandTask ? "rotate-180" : "rotate-0"
              }`}
            >
              <path
                d="M18 9L12.3536 14.6464C12.1583 14.8417 11.8417 14.8417 11.6464 14.6464L6 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h1 className="text-bodyMD font-bold">{task.title}</h1>
          </div>
          <div className={`${optionMenu ? "block" : "hidden"} flex gap-3 `}>
            <p
              className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[10px] px-4"
              onClick={handleEditTask}
            >
              Edit
            </p>
            <p
              className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[10px] px-4"
              onClick={() => handleDeleteTask({ taskColumnId: task._id })}
            >
              Delete
            </p>
          </div>
        </div>
        <TaskOptions
          setOptionMenu={setOptionMenu}
          colorScheme={colorScheme}
          optionMenu={optionMenu}
        />
        <p className="text-bodyMD">{task?.duedate}</p>
        {task?.priority || task?.tag ? (
          <div className="flex gap-1 text-bodyMD">
            {task?.priority === "High" && (
              <div
                className={`flex items-center gap-1 text-[${Red[300]}] bg-[${Red[100]}] font-bold px-2 rounded-full text-titleMD`}
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
                <p>{task.priority}</p>
              </div>
            )}
            {task?.priority === "Medium" && (
              <div
                className={`flex items-center gap-1 text-[${Orange[300]}] bg-[${Orange[100]}] font-bold px-2 rounded-full text-titleMD`}
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
                <p>{task.priority}</p>
              </div>
            )}
            {task?.priority === "Low" && (
              <div
                className={`flex items-center gap-1 text-[${Green[300]}] bg-[${Green[100]}] font-bold px-2 rounded-full text-titleMD`}
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
                <p>{task.priority}</p>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {!task?.estimate ? (
            <svg
              width="21"
              height="21"
              viewBox="0 0 11 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-stroke"
              stroke-width="1.3"
            >
              <path d="M5.5 8.5L9.02802 5.36398C9.64627 4.81443 10 4.02672 10 3.19953V2.70711C10 2.25435 9.82014 1.82014 9.5 1.5V1.5C9.17986 1.17986 8.74565 1 8.29289 1H2.70711C2.25435 1 1.82014 1.17986 1.5 1.5V1.5C1.17986 1.82014 1 2.25435 1 2.70711V3.19953C1 4.02672 1.35373 4.81443 1.97198 5.36398L5.5 8.5ZM5.5 8.5L1.70711 12.2929C1.25435 12.7456 1 13.3597 1 14V14.2929C1 14.7456 1.17986 15.1799 1.5 15.5V15.5C1.82014 15.8201 2.25435 16 2.70711 16H8.29289C8.74565 16 9.17986 15.8201 9.5 15.5V15.5C9.82014 15.1799 10 14.7456 10 14.2929V14C10 13.3597 9.74565 12.7456 9.29289 12.2929L5.5 8.5Z"></path>
            </svg>
          ) : (
            <p className="text-bodyMD">{task?.estimate}</p>
          )}
        </div>
        <div className="text-[13px]">
          {task?.tag ? (
            <p
              className={`w-fit font-medium border-2 border-[${
                colorScheme && colorScheme[300]
              }] text-[${
                colorScheme && colorScheme[300]
              }] rounded-full px-2 py-[2px]`}
            >
              {task?.tag}
            </p>
          ) : (
            <div></div>
          )}
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`stroke-stroke`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6358 3.90949C15.2888 3.47412 15.6153 3.25643 15.9711 3.29166C16.3269 3.32689 16.6044 3.60439 17.1594 4.15938L19.8406 6.84062C20.3956 7.39561 20.6731 7.67311 20.7083 8.02888C20.7436 8.38465 20.5259 8.71118 20.0905 9.36424L18.4419 11.8372C17.88 12.68 17.5991 13.1013 17.3749 13.5511C17.2086 13.8845 17.0659 14.2292 16.9476 14.5825C16.7882 15.0591 16.6889 15.5557 16.4902 16.5489L16.2992 17.5038C16.2986 17.5072 16.2982 17.5089 16.298 17.5101C16.1556 18.213 15.3414 18.5419 14.7508 18.1351C14.7497 18.1344 14.7483 18.1334 14.7455 18.1315V18.1315C14.7322 18.1223 14.7255 18.1177 14.7189 18.1131C11.2692 15.7225 8.27754 12.7308 5.88691 9.28108C5.88233 9.27448 5.87772 9.26782 5.86851 9.25451V9.25451C5.86655 9.25169 5.86558 9.25028 5.86486 9.24924C5.45815 8.65858 5.78704 7.84444 6.4899 7.70202C6.49113 7.70177 6.49282 7.70144 6.49618 7.70076L7.45114 7.50977C8.44433 7.31113 8.94092 7.21182 9.4175 7.05236C9.77083 6.93415 10.1155 6.79139 10.4489 6.62514C10.8987 6.40089 11.32 6.11998 12.1628 5.55815L14.6358 3.90949Z"
            fill="none"
          />
          <path d="M5 19L9.5 14.5" trokeLinecap="round" />
        </svg>
      </div>
      <div className="pl-[40px]">
        {checklist.length > 0
          ? checklist.map((c, index) => (
              <div className="flex gap-3 items-center mb-3 last:pb-3 pl-6">
                <div
                  onClick={() => handleCheck({ id: c._id, index })}
                  className={`bg-[${
                    c.completed && colorScheme && colorScheme[300]
                  }] w-[21px] h-[21px] border-2 border-[${
                    colorScheme && colorScheme[300]
                  }] rounded-full flex justify-center items-center text-White text-[12px]`}
                >
                  {c.completed && (
                    <svg
                      width="15"
                      height="15"
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
      </div>
    </section>
  );
}

export default Task;
