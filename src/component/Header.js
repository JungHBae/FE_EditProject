import { Pets } from "@mui/icons-material";
import { Chip, AppBar, Box, Button, Toolbar } from "@mui/material";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authUser } from "../redux/modules/auth";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
// import { motion } from "framer-motion";

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const userToken = jwtDecode(token);
      dispatch(authUser(["true", userToken.sub]));
    }
  }, [dispatch]);

  const isAuth = useSelector((state) => state.auth.authorizedUser);
  const userName = useSelector((state) => state.auth.userName);
  console.log(isAuth);
  const handleTabChange = (newValue) => {
    const pages = ["/", "/matching", "/board", "/signup", "/login", "/chat", "/myprofile"];
    navigate(pages[newValue]);
  };

  const isHomePage = location.pathname === "/";
  const isMatchingPage = location.pathname === "/matching";
  const isBoardPage = location.pathname === "/board";
  const isSignupPage = location.pathname === "/signup";
  const isLoginPage = location.pathname === "/login";
  const isChatPage = location.pathname === "/chat";
  const isMyprofilePage = location.pathname === "/myprofile";

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(authUser(["false", ""]));
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar className="navigation">
          <Pets sx={{ display: "block" }} onClick={() => navigate("/")} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box m={1} sx={{ display: "flex", gap: 1 }}>
              <Button
                key={"Home"}
                onClick={() => handleTabChange(0)}
                sx={{
                  my: 2,
                  color: isHomePage ? "#ffa300" : "white",
                  display: "block",
                }}
              >
                Home
              </Button>

              <Button
                key={"Matching"}
                onClick={() => handleTabChange(1)}
                sx={{
                  my: 2,
                  color: isMatchingPage ? "#ffa300" : "white",
                  display: "block",
                }}
              >
                Matching
              </Button>
              <Button
                key={"Board"}
                onClick={() => handleTabChange(2)}
                sx={{
                  my: 2,
                  color: isBoardPage ? "#ffa300" : "white",
                  display: "block",
                }}
              >
                Board
              </Button>
            </Box>
            <Box m={1} sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
              {isAuth ? (
                <>
                  <Chip
                    label={userName}
                    sx={{
                      backgroundColor: "#860000",
                      color: "#ffffff",
                      borderRadius: "7px",
                      padding: "3px 7px 3px 7px",
                    }}
                  />
                  <Button
                    key={"Login"}
                    onClick={handleLogout}
                    sx={{
                      my: 2,
                      color: isLoginPage ? "#ffa300" : "white",
                      display: "block",
                    }}
                  >
                    Logout
                  </Button>
                  <Button
                    key={"Chat"}
                    onClick={() => handleTabChange(5)}
                    sx={{
                      my: 2,
                      color: isChatPage ? "#ffa300" : "white",
                      display: "block",
                    }}
                  >
                    Chat
                  </Button>
                  <Button
                    key={"Myprofile"}
                    onClick={() => handleTabChange(6)}
                    sx={{
                      my: 2,
                      color: isMyprofilePage ? "#ffa300" : "white",
                      display: "block",
                    }}
                  >
                    Myprofile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    key={"Signup"}
                    onClick={() => handleTabChange(3)}
                    sx={{
                      my: 2,
                      color: isSignupPage ? "#ffa300" : "white",
                      display: "block",
                    }}
                  >
                    Signup
                  </Button>
                  <Button
                    key={"Login"}
                    onClick={() => handleTabChange(4)}
                    sx={{
                      my: 2,
                      color: isLoginPage ? "#ffa300" : "white",
                      display: "block",
                    }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
