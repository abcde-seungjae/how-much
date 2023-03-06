import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";

function MainLayout() {
  return (
    <>
      <div className="flex flex-col h-screen bg-hm-beise">
        <MainHeader />
        <div className="h-full workspace bg-hm-beise">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
