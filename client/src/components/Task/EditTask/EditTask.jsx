import React from "react";
import MarkCompleted from "./MarkCompleted";
import EditForm from "../../Forms/EditForm";
import useConvertDate from "../../../customHooks/useConvertDate";

function EditTask({ task, setEditMode, columnId, theme }) {
  const { date, month, year } = useConvertDate({ data: task });

  return (
    <section
      className={`bg-backgroundSecondary text-textTertiary m-auto w-[800px] h-max rounded-[10px] fixed z-10 top-0 bottom-0 right-0 left-0 overflow-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
    >
      <MarkCompleted setEditMode={setEditMode} theme={theme} />
      <div className="p-[35px] pt-[29.77px]">
        <p className="font-bold text-headingH2 leading-heading tracking-H1 mb-6">
          {task.title}
        </p>
        <div className="flex gap-10 align-middle mb-2">
          <p>Created</p>
          <p className="font-bold">
            {date} {month}, {year}
          </p>
        </div>
        <EditForm
          task={task}
          columnId={columnId}
          setEditMode={setEditMode}
          theme={theme}
        />
      </div>
    </section>
  );
}

export default EditTask;
