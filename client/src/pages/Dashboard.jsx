import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import WorkspaceNav from "../components/MainWorkSpace/WorkspaceNav";
import { useParams } from "react-router-dom";
import { useGetUserPreferenceQuery } from "../features/authSlice/authApiSlice";

function Dashboard() {
  const { id } = useParams();
  const { data: pref } = useGetUserPreferenceQuery({
    refetchOnMountOrArgChange: true,
  });

  return (
    <section className="flex h-[100vh] root">
      <Sidebar />
      <div className="flex-1 bg-backgroundPrimary overflow-hidden">
        {id && <WorkspaceNav />}
        <Outlet />
      </div>
    </section>
  );
}

export default Dashboard;
