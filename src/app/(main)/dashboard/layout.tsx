import React from "react";
import SideBar from "./_components/SideBar";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col sm:flex-row ">
        <SideBar />
      <div className="p-5 w-full">{children}</div>
    </div>
  );
}

export default layout;
