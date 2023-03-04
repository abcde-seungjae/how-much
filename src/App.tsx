import React from 'react';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from 'page/main/MainPage';
import Travel from 'page/travel/Travel';
import MainLayout from 'page/layout/MainLayout';
import Login from 'page/account/Join';
import Join from 'page/account/Join';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<MainPage/>} />
          <Route path="/travel" element={<Travel/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/join" element={<Join/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
