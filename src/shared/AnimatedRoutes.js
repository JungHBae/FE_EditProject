import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../pages/Home";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { ProfilePage } from "../pages/ProfilePage";
import { MyProfile } from "../pages/MyProfile";
import { Matching } from "../pages/Matching";
import { BoardPage } from "../pages/BoardPage";
import { Messages } from "../pages/Messages";
import { Board } from "../component/Board";
export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Routes key={location.key} location={location}>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="profile/:id" element={<ProfilePage />} />
      <Route path="myprofile" element={<MyProfile />} />
      <Route path="matching" element={<Matching />} />
      <Route path="board" element={<BoardPage />} />
      <Route path="board/:id" element={<Board />} />
      <Route path="chat" element={<Messages />} />
    </Routes>
  );
};
