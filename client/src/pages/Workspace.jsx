import React, { useEffect } from "react";
import MainWorkspace from "../components/MainWorkSpace/MainWorkspace";
import { useGetUserPreferenceQuery } from "../features/authSlice/authApiSlice";
import useGetColorVariants from "../customHooks/useGetColorVariants";

function Workspace() {
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });
  const theme = pref?.theme;
  const color = pref?.colorScheme;
  const { gradient, colorScheme } = useGetColorVariants({ color });
  const root = document.getElementById("root");

  useEffect(() => {
    const workspace = document.querySelector(".workspace");
    if (theme === "Dark") {
      workspace.classList.add("bg-1000");
      workspace.classList.remove(gradient);
    } else {
      workspace.classList.remove("bg-1000");
      workspace.classList.add(gradient);
    }
  }, [theme]);

  return (
    <div className="workspace">
      <MainWorkspace colorScheme={colorScheme} />
    </div>
  );
}

export default Workspace;
