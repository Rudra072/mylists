import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import ColumnOptions from "../Column/ColumnOptions";
import Task from "./Task";
import { useSelector } from "react-redux";
import {
  useEditColumnMutation,
  useDeleteColumnMutation,
} from "../../features/columnSlice/columnApiSlice";
import { selectCurrentFilters } from "../../features/authSlice/authSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import AddTaskForm from "./AddTaskForm";

function Column({ column, index, pref, ringColor }) {
  gsap.registerPlugin(useGSAP, CustomEase);
  const { id } = useParams();
  const theme = pref?.theme;
  const filters = useSelector(selectCurrentFilters);
  const totalTasks = column.tasks && column.tasks.length;
  const [deleteColumn] = useDeleteColumnMutation();
  const [editColumn] = useEditColumnMutation();
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const [expandColumn, setExpandColumn] = useState(true);
  const [columnName, setColumnName] = useState(column?.title);
  const [optionMenu, setOptionMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adding, setAdding] = useState(false);
  const container = useRef();

  useGSAP(
    () => {
      const tl = gsap.timeline();
      if (expandColumn) {
        tl.to(container.current, { height: "auto", duration: 0.5 });
      } else {
        tl.to(container.current, { height: "3rem", duration: 0.5 });
      }
    },
    {
      dependencies: [expandColumn],
      scope: container,
    }
  );

  const handleExpand = () => {
    setExpandColumn((prev) => !prev);
    if (expandColumn) setOptionMenu(false);
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

  const handleEditMode = () => {
    setEditMode(true);
    setOptionMenu(false);
  };

  const handleBlur = () => {
    setEditMode(false);
    setColumnName(column?.title);
  };

  const handleDeleteColumn = ({ taskColumnId }) => {
    deleteColumn({ id, taskColumnId });
    setOptionMenu(false);
  };

  const handleCancel = () => {
    setAdding(false);
  };

  return (
    <section
      ref={container}
      className={`gap-8 text-textTertiary border-b border-border last:border-b-0 select-none relative overflow-hidden`}
    >
      <div>
        <div className="flex items-center gap-3 p-3">
          <svg
            onClick={handleExpand}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`stroke-stroke cursor-pointer ${
              expandColumn ? "rotate-0" : "rotate-180"
            }`}
          >
            <path
              d="M18 9L12.3536 14.6464C12.1583 14.8417 11.8417 14.8417 11.6464 14.6464L6 9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          {editMode ? (
            <input
              autoFocus
              type="text"
              className="bg-backgroundSecondary outline-none font-bold w-[135px]"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={(e) => editColumnName(e, { columnId: column._id })}
            />
          ) : (
            <h1 className="font-bold text-ellipsis overflow-hidden text-nowrap w-[135px]">
              {column.title}
            </h1>
          )}
          <div
            className={`w-[20px] h-[20px] bg-[${
              colorScheme && colorScheme[300]
            }] rounded-full flex justify-center items-center text-textPrimary text-[12px]`}
          >
            {totalTasks}
          </div>
          <div className={`${!expandColumn && "hidden"}`}>
            <ColumnOptions
              theme={theme}
              setAdding={setAdding}
              adding={adding}
              setOptionMenu={setOptionMenu}
              optionMenu={optionMenu}
              colorScheme={colorScheme}
            />
          </div>
          <div
            className={`${
              optionMenu ? "block" : "hidden"
            } flex gap-3 text-bodyMD`}
          >
            <p
              className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[10px] px-4 hover:cursor-pointer"
              onClick={handleEditMode}
            >
              Edit
            </p>
            <p
              className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[10px] px-4 hover:cursor-pointer"
              onClick={() => handleDeleteColumn({ taskColumnId: column._id })}
            >
              Delete
            </p>
          </div>
          {column.tasks.length === 0 && (
            <div className="text-center text-bodyMD bg-backgroundSecondary rounded-lg cursor-pointer text-textSecondary">
              Oops looks like no tasks yet!! (click + to add one)
            </div>
          )}
        </div>
        {column.tasks.map((task, index) => (
          <div className="task" key={task._id}>
            <Task
              expandColumn={expandColumn}
              task={task}
              column={column}
              columnId={column._id}
              index={index}
              theme={theme}
              pref={pref}
            />
          </div>
        ))}
        <AddTaskForm
          key={index}
          ringColor={ringColor}
          adding={adding}
          column={column}
          handleCancel={handleCancel}
          setAdding={setAdding}
          pref={pref}
        />
      </div>
    </section>
  );
}

export default Column;
