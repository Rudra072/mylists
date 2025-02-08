import React, { useState, useRef, useEffect } from "react";
import Task from "../Task/Task";
import { useParams } from "react-router-dom";
import {
  useDeleteColumnMutation,
  useEditColumnMutation,
} from "../../features/columnSlice/columnApiSlice";
import { useEditTaskMutation } from "../../features/taskSlice/taskApiSlice";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import AddTaskForm from "../Task/AddTaskForm";
import ColumnOptions from "./ColumnOptions";
import OptionMenu from "../Common/OptionMenu";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { useSelector } from "react-redux";
import { selectCurrentFilters } from "../../features/authSlice/authSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Column({ column, index, pref }) {
  gsap.registerPlugin(useGSAP);
  const { id } = useParams();
  const [tasks, setTasks] = useState();
  const filters = useSelector(selectCurrentFilters);
  const [editColumn] = useEditColumnMutation();
  const [editTask] = useEditTaskMutation();
  const [optionMenu, setOptionMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleteColumn] = useDeleteColumnMutation();
  const [columnName, setColumnName] = useState(column?.title);
  const totalTasks = column.tasks && column.tasks.length;
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const theme = pref?.theme;
  const container = useRef();

  useEffect(() => {
    setTasks(column?.tasks);
  }, [column]);

  const handleDeleteColumn = ({ taskColumnId }) => {
    deleteColumn({ id, taskColumnId });
    setOptionMenu(false);
  };

  const editColumnName = (e, { columnId }) => {
    if (e.key === "Enter") {
      setEditMode(false);
      const body = {
        title: columnName,
      };
      editColumn({
        filters,
        id,
        columnId,
        body,
      });
    }
  };

  const tooglePin = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, pinned: !task.pinned } : task
    );

    // Sort tasks so pinned tasks come first
    // updatedTasks.sort((a, b) =>
    //   b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1
    // );

    setTasks(updatedTasks); // Update the state with the sorted tasks

    const task = tasks.find((task) => task._id === taskId);
    const body = { pinned: !task.pinned };

    // Persist the change to the backend
    await editTask({
      id,
      columnId: column?._id,
      taskId,
      body,
    });
  };

  const handleEditMode = () => {
    setEditMode(true);
    setOptionMenu(false);
  };

  const handleBlur = () => {
    setEditMode(false);
    setColumnName(column?.title);
  };

  useGSAP(
    () => {
      gsap.fromTo(
        container.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.75, delay: index * 0.3 }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <Draggable draggableId={index.toString()} index={index} key={column._id}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={`columnTitle h-full select-none relative`}
          >
            <OptionMenu
              optionMenu={optionMenu}
              handleEditMode={handleEditMode}
              handleDelete={handleDeleteColumn}
              data={column}
              option1={"Rename"}
              option2={"Delete"}
              top={"44px"}
              left={"190px"}
            />
            <div
              {...provided.dragHandleProps}
              className={`bg-backgroundSecondary text-textTertiary w-[250px] mb-4 rounded-[10px] flex justify-between items-center px-[15px] py-[10px] border-t-[3px] border-[${
                colorScheme && colorScheme[300]
              }]`}
            >
              <div className="flex justify-center items-center gap-[10px]">
                {editMode ? (
                  <input
                    autoFocus
                    type="text"
                    className={`bg-backgroundSecondary outline-none font-bold w-[135px]`}
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) =>
                      editColumnName(e, { columnId: column._id })
                    }
                  />
                ) : (
                  <h1 className="font-bold text-ellipsis overflow-hidden text-nowrap w-[135px]">
                    {column.title}
                  </h1>
                )}
                <div
                  className={`w-[23px] h-[23px] bg-[${
                    colorScheme && colorScheme[300]
                  }] rounded-full flex justify-center items-center text-textPrimary text-[12px]`}
                >
                  {totalTasks}
                </div>
              </div>
              <ColumnOptions
                theme={theme}
                setAdding={setAdding}
                setOptionMenu={setOptionMenu}
              />
            </div>
            <Droppable
              key={index.toString()}
              droppableId={column._id}
              type="task"
            >
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {tasks?.map((task, index) => (
                    <div className={`task`}>
                      <Task
                        key={task._id}
                        task={task}
                        column={column}
                        index={index}
                        tooglePin={tooglePin}
                      />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <AddTaskForm
              theme={theme}
              adding={adding}
              setAdding={setAdding}
              column={column}
            />
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default Column;
