import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "page/main/MainPage";
import Travel from "page/travel/Travel";
import MainLayout from "page/layout/MainLayout";
import Login from "page/account/Login";
import Join from "page/account/Join";
import JoinSuccess from "page/account/JoinSuccess";
import TravelRegist from "page/travel/TravelRegist";
import GetContries from "page/travel/GetContries";
import ContentsLayout from "page/layout/ContentsLayout";
import Fallback from "page/layout/Fallback";
import MoneyManage from "page/moneyManage/MoneyManage";

function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<MainPage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>

          <Route path="/" element={<ContentsLayout />}>
            <Route path="/travel" element={<Travel />} />
            <Route path="/travelRegist" element={<TravelRegist />} />
            <Route path="/moneyManage" element={<MoneyManage />} />
          </Route>

          <Route path="/joinSuccess" element={<JoinSuccess />} />
          <Route path="/getContries" element={<GetContries />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
