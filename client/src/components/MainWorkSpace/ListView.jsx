import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useGetColumnsQuery } from "../../features/columnSlice/columnApiSlice";
import { selectCurrentFilters } from "../../features/authSlice/authSlice";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import Column from "../Listview/Column";
import AddColumnForm from "../Listview/AddColumnForm";
import useGetColorVariants from "../../customHooks/useGetColorVariants";

function ListView() {
  const { id } = useParams();
  const filters = useSelector(selectCurrentFilters);
  const [adding, setAdding] = useState(false);
  const { data: myColumns } = useGetColumnsQuery(
    { id, filters },
    {
      skip: !filters,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const theme = pref?.theme;

  useEffect(() => {
    const root = document.querySelector(".root");
    const scrollbar = document.querySelector(".scrollbar");

    if (theme === "Light") {
      root.classList.remove("dark");
      root.classList.add("light");
      scrollbar.style.setProperty("--color", colorScheme && colorScheme[200]);
      scrollbar.style.setProperty("--bgColor", colorScheme && colorScheme[400]);
      scrollbar.style.setProperty(
        "--bgHoverColor",
        colorScheme && colorScheme[500]
      );
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      scrollbar.style.setProperty("--color", "#1F242A");
      scrollbar.style.setProperty("--bgColor", "#101318");
      scrollbar.style.setProperty("--bgHoverColor", "#313840");
    }
  }, [root, theme]);

  return (
    <section className="px-[15px] h-[88vh] overflow-y-auto scrollbar">
      <DragDropContext
        droppableId="columns"
        type="column"
        direction="vertical"
        key="columns"
      >
        <div className="text-textSecondary font-thin text-sm grid grid-cols-[1fr_minmax(150px,_150px)_150px_150px_250px_50px] p-4">
          <div>
            <h1>Task</h1>
          </div>
          <div>
            <h1>Due Date</h1>
          </div>
          <div>
            <h1>Priority</h1>
          </div>
          <div>
            <h1>Time Estimate</h1>
          </div>
          <div>
            <h1>Tag</h1>
          </div>
          <div>
            <h1>Pinned</h1>
          </div>
        </div>
        <Droppable>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="bg-backgroundSecondary rounded-[10px] border border-border flex flex-col mb-5"
            >
              {myColumns?.map((column, index) => (
                <Column
                  column={column}
                  key={index}
                  index={index}
                  pref={pref}
                  ringColor={pref?.colorScheme}
                />
              ))}
            </div>
          )}
        </Droppable>
        <AddColumnForm setAdding={setAdding} adding={adding} theme={theme} />
      </DragDropContext>
    </section>
  );
}

export default ListView;
