import React, { useEffect, useState } from "react";
import { useGetBoardsQuery } from "../../features/boardSlice/boardApiSlice";
import BoardForm from "../Forms/BoardForm";
import Board from "./Board";
import { useGetUserPreferenceQuery } from "../../features/authSlice/authApiSlice";
import useGetColorVariants from "../../customHooks/useGetColorVariants";
import { Spinner } from "@nextui-org/spinner";

function Boards({ theme }) {
  const { data: myBoards } = useGetBoardsQuery();
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const { colorScheme } = useGetColorVariants({ color: pref?.colorScheme });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scrollbar = document.querySelector(".scrollbar");

    if (theme === "Light") {
      scrollbar.style.setProperty("--color", colorScheme && colorScheme[200]);
      scrollbar.style.setProperty("--bgColor", colorScheme && colorScheme[400]);
      scrollbar.style.setProperty(
        "--bgHoverColor",
        colorScheme && colorScheme[500]
      );
    } else {
      scrollbar.style.setProperty("--color", "#1F242A");
      scrollbar.style.setProperty("--bgColor", "#101318");
      scrollbar.style.setProperty("--bgHoverColor", "#313840");
    }
  }, [root, theme]);

  return (
    <section className="">
      <h1 className="font-bold text-[20px] -tracking-[1px] mb-[15px]">
        My boards
      </h1>
      <div className="grid grid-cols-4 gap-5 relative h-[220px] overflow-x-auto scrollbar">
        {myBoards?.map((board, index) => (
          <Board key={index} board={board} theme={theme} />
        ))}
        {loading ? (
          <Spinner color="default" label="getting ready your board..." />
        ) : (
          <BoardForm theme={theme} loading={loading} setLoading={setLoading} />
        )}
      </div>
    </section>
  );
}

export default Boards;
