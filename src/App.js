import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import Detail from "./pages/Detail/Detail";
import Remonth from "./pages/Remonth/Remonth";
import Moment from "./pages/Moment/Moment";
import MyPage from "./pages/MyPage/MyPage";
import RemonthDetail from "./pages/RemonthDetail/RemonthDetail";
import MyMoment from "./pages/MyMoment/MyMoment";

export default function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moment" element={<Moment />} />
        <Route path="/moment/:id" element={<Detail />} />
        <Route path="/remonth" element={<Remonth />} />
        <Route path="/remonth/:id" element={<RemonthDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/moment" element={<MyMoment />} />
        <Route path="/builder/moment" element={<Builder />} />
        <Route path="/builder/remonth" element={<Builder />} />
      </Routes>
    </div>
  );
}
