import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { Signup } from "../pages/Signup";
import { Login } from "../pages/Login";
import { ProfilePage } from "../pages/ProfilePage";
import { MyProfile } from "../pages/MyProfile";
import { Matching } from "../pages/Matching";
import { BoardPage } from "../pages/BoardPage";
import { Messages } from "../pages/Messages";
import { Board } from "../component/Board";
import { BoardEdit } from "../pages/BoardEdit";
import { AnimatePresence } from "framer-motion";
import { authUser } from "../redux/modules/auth";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
// import jwtDecode from "jwt-decode";
// import axios from "axios";

export const AnimatedRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.authorizedUser);
  const dispatch = useDispatch();

  // const authUsers = async (token) => {
  //   try {
  //     await axios.get(`http://localhost:4000/token`, {
  //       headers: {
  //         ACCESS_HEADER: `Bearer ${token}`,
  //       },
  //     });

  //   } catch (e) {
  //     if (e.response.status === 401) {
  //       Cookies.remove("token");
  //       alert(e);
  //       // navigate("/");
  //     }
  //   }
  // };

  // authenticate user on every route transition
  useEffect(() => {
    const token = Cookies.get("token");
    // if (token) authUsers(token);
    //check if cookie has expired. only alert if was logged in previously(redux state true -> false)
    if (isAuth && !token) {
      dispatch(authUser(["false", ""]));
      alert("login session has expired");
      navigate("/");
    }
  });

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.key} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="matching" element={<Matching />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="boardEdit" element={<BoardEdit />} />
        <Route path="board/:id" element={<Board />} />
        <Route path="chat" element={<Messages />} />
      </Routes>
    </AnimatePresence>
  );
};
