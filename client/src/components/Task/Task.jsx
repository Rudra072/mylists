import React, { useState, useRef } from "react";
import PinTask from "./PinTask";
import { useParams } from "react-router-dom";
import { Draggable } from "@hello-pangea/dnd";
import OptionMenu from "../Common/OptionMenu";
import TaskOptions from "./TaskOptions";
import EditTask from "./EditTask/EditTask";
import { useDeleteTaskMutation } from "../../features/taskSlice/taskApiSlice";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Task({ task, column, index, tooglePin }) {
  gsap.registerPlugin(useGSAP);
  const { id } = useParams();
  const [deleteTask] = useDeleteTaskMutation();
  const [optionMenu, setOptionMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { data: pref } = useGetUserPreferenceQuery();
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const { colorScheme: Red } = useGetColorVariants({ color: "Red" });
  const { colorScheme: Orange } = useGetColorVariants({ color: "Orange" });
  const { colorScheme: Green } = useGetColorVariants({ color: "Green" });
  const theme = pref?.theme;
  const container = useRef();
  const priority = task?.priority;
  const priorityStyles = {
    High: {
      textColor: `text-[${Red[300]}]`,
      bgColor: `bg-[${Red[100]}]`,
      fillColor: `fill-[${Red[300]}]`,
      strokeColor: `stroke-[${Red[300]}]`,
    },
    Medium: {
      textColor: `text-[${Orange[300]}]`,
      bgColor: `bg-[${Orange[100]}]`,
      fillColor: `fill-[${Orange[300]}]`,
      strokeColor: `stroke-[${Orange[300]}]`,
    },
    Low: {
      textColor: `text-[${Green[300]}]`,
      bgColor: `bg-[${Green[100]}]`,
      fillColor: `fill-[${Green[300]}]`,
      strokeColor: `stroke-[${Green[300]}]`,
    },
  };

  const { textColor, bgColor, fillColor, strokeColor } =
    priorityStyles[priority] || {};

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

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.85, delay: index * 0.35 }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      {editMode && (
        <EditTask
          task={task}
          setEditMode={setEditMode}
          columnId={column._id}
          theme={theme}
        />
      )}
      <Draggable draggableId={task?._id} index={index} key={task._id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`flex flex-col mb-4 rounded-[10px] gap-[3px] w-[250px] relative`}
          >
            <OptionMenu
              optionMenu={optionMenu}
              handleDelete={handleDeleteTask}
              data={task}
              handleEditMode={handleEditTask}
              option1={"Edit"}
              option2={"Remove"}
              top={"60%"}
              left={"190px"}
            />
            <div
              className={`bg-backgroundSecondary text-textTertiary rounded-t-[10px] p-[15px]`}
            >
              {task?.priority || task?.tag ? (
                <div className="flex flex-wrap align-middle gap-1 text-bodyMD mb-2">
                  <div
                    className={`flex ${
                      task?.priority === "Medium"
                        ? "w-[86.84px]"
                        : "w-[61.84px]"
                    }  items-center gap-1 ${textColor} ${bgColor} font-bold px-2 py-[2px] rounded-full text-titleMD hover:cursor-default ${
                      task?.priority === "Medium"
                        ? "hover:w-[50%]"
                        : "hover:w-[38%]"
                    } group transition-all duration-350 ease-in-out`}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`${strokeColor} ${fillColor} flex-shrink-0`}
                      stroke-width="1.3"
                    >
                      <path d="M1 2H10.2732C11.136 2 11.5938 3.01946 11.0206 3.66436L9.09055 5.83564C8.75376 6.21452 8.75376 6.78548 9.09055 7.16436L11.0206 9.33564C11.5938 9.98054 11.136 11 10.2732 11H1M1 2V11M1 2V0M1 11V15"></path>
                    </svg>

                    <p className="flex-grow">{priority}</p>
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-250 ease-out">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class={`${strokeColor}`}
                      >
                        <path
                          d="M9 9L15 15"
                          stroke-width="1.2"
                          stroke-linecap="round"
                        ></path>
                        <path
                          d="M15 9L9 15"
                          stroke-width="1.2"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  {task?.tag && (
                    <div className={`flex items-center`}>
                      <p
                        className={`hover:cursor-default font-medium border-2 border-[${
                          colorScheme && colorScheme[300]
                        }] text-[${
                          colorScheme && colorScheme[300]
                        }] rounded-full px-2 py-[2px]`}
                      >
                        {task?.tag}
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
              <div className="flex justify-center items-center mb-2">
                <h1 className="w-full text-bodyMD font-bold">{task.title}</h1>
                <TaskOptions setOptionMenu={setOptionMenu} theme={theme} />
              </div>
              <p className="text-[14px] text-textSecondary leading-[1.4] line-clamp-3">
                {task.description}
              </p>
            </div>
            <PinTask
              isPinned={task.pinned}
              theme={theme}
              task={task}
              pref={pref}
              onPinClick={() => tooglePin(task._id)}
            />
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default Task;
