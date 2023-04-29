import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const SIGNUP_URL = "/member/signup";
const MotionContainer = motion(Container);

export const Signup = () => {
  const [user, setUser] = useState({ userId: "", password: "", email: "", nickname: "", job: "editor" });

  // redirect if logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  //POST request to signup user
  const signupUser = async (user) => {
    try {
      const response = await axios.post(SIGNUP_URL, user);
      console.log(response.data);
      // navigate("/login");
    } catch (error) {
      alert(`400:${error.response.data.message}`);
    }
  };

  // value change handler
  const handleValueChange = (e) => {
    const changedValue = e.target.value;
    const targetInput = e.target.name;
    setUser({ ...user, [targetInput]: changedValue });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { userId, password } = user;
    if (typeof userId !== "string" || !userId.trim()) {
      alert("Please enter a valid ID");
      return;
    }
    if (typeof password !== "string" || !password.trim()) {
      alert("Please enter a valid password");
      return;
    }
    signupUser(user);
  };
  console.log(user);
  return (
    <MotionContainer initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.2 }}>
      <Box maxWidth="xs" sx={{ marginTop: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography variant="h4">Signup</Typography>
        <Box component="form" sx={{ mt: 3, width: "400px" }} onSubmit={handleSignupSubmit}>
          <TextField
            label="Username"
            name="userId"
            variant="outlined"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.userId}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 30 }}
            autoFocus
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.password}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 30 }}
          />

          <FormControl fullWidth variant="outlined" margin="normal" sx={{ mt: 2 }}>
            <InputLabel shrink margin="dense" htmlFor="job-select" required>
              Job
            </InputLabel>
            <Select
              labelId="job-select-label"
              id="job-select"
              name="job"
              value={user.job}
              label="Job"
              required
              onChange={(e) => setUser({ ...user, job: e.target.value })}
            >
              <MenuItem value="editor">편집자</MenuItem>
              <MenuItem value="youtuber">크리에이터</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Nickname"
            name="nickname"
            variant="outlined"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.nickname}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 30 }}
          />

          <TextField
            label="Email"
            name="email"
            variant="outlined"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.email}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 30 }}
          />

          <Button variant="contained" fullWidth sx={{ mt: "20px" }} type="submit">
            Signup
          </Button>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Box>
    </MotionContainer>
  );
};
