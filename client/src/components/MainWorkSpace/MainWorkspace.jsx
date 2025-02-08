import React, { useState, useEffect, useRef } from "react";
import Column from "../Column/Column";
import { useParams } from "react-router-dom";
import AddColumnForm from "../Column/AddColumnForm";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useGetColumnsQuery } from "../../features/columnSlice/columnApiSlice";
import useDragDrop from "../../customHooks/useDragDrop";
import { selectCurrentFilters } from "../../features/authSlice/authSlice";
import { useSelector } from "react-redux";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function MainWorkspace({ colorScheme }) {
  gsap.registerPlugin(useGSAP);
  const { id } = useParams();
  const [adding, setAdding] = useState(false);
  const filters = useSelector(selectCurrentFilters);
  const { data: myColumns } = useGetColumnsQuery(
    { id, filters },
    {
      skip: !filters,
      refetchOnMountOrArgChange: true,
    }
  );
  const { onDragEnd } = useDragDrop({ myColumns, filters });
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const theme = pref?.theme;
  const container = useRef();

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

  useGSAP(
    () => {
      gsap.fromTo(
        ".coll",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.75 }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="columns"
          type="column"
          direction="horizontal"
          key="columns"
        >
          {(provided) => (
            //IMPORTANT - Removing masked-overflow and other overflow property only would enable dragovercolumn functionality
            //and its also responsible for edit form yk eats space from top...
            <section
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mainworkspace py-[25px] px-[15px] flex h-[91.5vh] justify-start items-start gap-[15px] relative overflow-auto scrollbar"
            >
              {myColumns?.map((column, index) => (
                <Column column={column} key={index} index={index} pref={pref} />
              ))}
              {provided.placeholder}
              <div className="coll">
                <AddColumnForm
                  adding={adding}
                  setAdding={setAdding}
                  theme={theme}
                />
              </div>
            </section>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MainWorkspace;
