import React, { useState } from "react";
import TaskOptions from "../Task/TaskOptions";
import { useEditBoardMutation } from "../../features/boardSlice/boardApiSlice";
import { useDeleteBoardMutation } from "../../features/boardSlice/boardApiSlice";

const Board = ({ board, theme }) => {
  const [optionMenu, setOptionMenu] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [boardName, setBoardName] = useState(board.title);
  const [editBoard] = useEditBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();
  const imageUrl = board?.image[0]?.path;
  const handleEditBoard = () => {
    setEditMode(true);
    setOptionMenu(false);
  };

  const handleDeleteBoard = ({ boardId }) => {
    deleteBoard({ id: boardId });
    setOptionMenu(false);
  };

  const editBoardName = (e, { boardId }) => {
    if (e.key === "Enter") {
      setEditMode(false);
      const body = {
        title: boardName,
      };
      editBoard({
        id: boardId,
        body,
      });
    }
  };

  const handleBlur = () => {
    setEditMode(false);
    setOptionMenu(false)
    setBoardName(board?.title);
  };

  return (
    <div
      className={`border-2 flex flex-col bg-backgroundTertiary justify-end border-border rounded-[12px] h-[220px] relative board`}
      style={{
        backgroundImage: imageUrl && `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
      key={board._id}
    >
      <div
        className={`px-[20px] py-[15px] border-t-0 border-border bg-transparent rounded-b-[10px] flex justify-between bg items-center`}
      >
        {editMode ? (
          <input
            autoFocus
            type="text"
            className={`bg-[rgba(0,0,0,.5)] rounded-[4px] outline-none font-bold w-[80%] text-textPrimary pl-1`}
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => editBoardName(e, { boardId: board._id })}
          />
        ) : (
          <h1 className={`font-bold select-none text-textPrimary pl-1`}>
            {board.title}
          </h1>
        )}
        <div
          className={`${
            optionMenu ? "block" : "hidden"
          } flex gap-3 text-bodyMD absolute top-0 right-0 p-[15px]`}
        >
          <p
            className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[8px] px-4 hover:cursor-pointer"
            onClick={handleEditBoard}
          >
            Edit
          </p>
          <p
            className="bg-backgroundPrimary hover:bg-backgroundTertiary w-max rounded-[8px] px-4 hover:cursor-pointer"
            onClick={() => handleDeleteBoard({ boardId: board._id })}
          >
            Delete
          </p>
        </div>
        <TaskOptions
          setOptionMenu={setOptionMenu}
          isWhite="true"
          handleBlur={handleBlur}
          optionMenu={optionMenu}
        />
      </div>
    </div>
  );
};

export default Board;
