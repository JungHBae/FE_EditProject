import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/modules/auth";
import Cookies from "js-cookie";
import axios from "../api/axios";
import jwtDecode from "jwt-decode";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";
// let stompClient = null;


const LOGIN_URL = '/member/login';
const MotionContainer = motion(Container);
export const Login = () => {
  const [user, setUser] = useState({ userId: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // if already logged in, redirect to home page
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  //----------------request-------------------------//
  // Login POST request to the server
  const loginUser = async (user) => {
    try {
      const response = await axios.post(LOGIN_URL, user);

      const accessHeader = response.headers.get("access_header");
      console.log(accessHeader);
      const token = accessHeader.split(" ")[1];
      const userToken = jwtDecode(token);
      const data = response.data;
      console.log(data, "짱짱맨");
      const expirationTime = new Date(userToken.exp * 1000);
      // expirationTime.setTime(expirationTime.getTime() + 3 * 1000); // 10 minutes
      Cookies.set("token", token, { expires: expirationTime });
      dispatch(authUser(["true", data.data.nickname]));
      // let Sock = new SockJS("http://localhost:4000/ws-edit");
      // stompClient = over(Sock);
      // stompClient.connect();
      navigate(-1);
    } catch (error) {
      alert(`400: ${error.response.data.message}`);
    }
  };

  //----------------handlers------------------------//
  // use goal state to warn empty input
  const handleValueChange = (e) => {
    const changedValue = e.target.value;
    const targetInput = e.target.name;
    switch (targetInput) {
      case 'userId':
        setUser({ ...user, userId: changedValue });
        break;
      case 'password':
        setUser({ ...user, password: changedValue });
        break;
      default:
        break;
    }
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = user;
    if (typeof userId !== 'string' || !userId.trim()) {
      alert('Please enter a valid ID');
      return;
    }
    if (typeof password !== 'string' || !password.trim()) {
      alert('Please enter a valid password');
      return;
    }
    loginUser(user);
  };

  return (
    <MotionContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        maxWidth="xs"
        sx={{
          marginTop: '5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Login</Typography>
        <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 3 }}>
          <TextField
            label="ID"
            variant="outlined"
            name="userId"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.userId}
            fullWidth
            margin="normal"
            autoFocus
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.password}
            fullWidth
            margin="normal"
            type="password"
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: '20px' }}
            type="submit"
          >
            Signup
          </Button>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Don't have an account yet? <Link to="/signup">Register here</Link>
        </Typography>
      </Box>
    </MotionContainer>
  );
};
