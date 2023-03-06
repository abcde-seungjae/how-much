import React from "react";
import { Outlet } from "react-router-dom";
import ContentsHeader from "./ContentsHeader";

function ContentsLayout() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <ContentsHeader />
        <div className="h-full workspace">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ContentsLayout;
