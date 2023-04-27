import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import "./Signup.css";

export const Signup = () => {
  const [user, setUser] = useState({ id: "", password: "", job: "", nickname: "" });

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
      await axios.post(`${process.env.REACT_APP_LOGIN_SERVER_URL}/register`, user);
      alert("가입 성공!");
      navigate("/login");
    } catch (error) {
      alert(`401: ${error.response.data.message}`);
    }
  };

  // value change handler
  const handleValueChange = (e) => {
    const changedValue = e.target.value;
    const targetInput = e.target.name;
    switch (targetInput) {
      case "id":
        setUser({ ...user, id: changedValue });
        break;
      case "password":
        setUser({ ...user, password: changedValue });
        break;
      default:
        break;
    }
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { id, password } = user;
    if (typeof id !== "string" || !id.trim()) {
      alert("Please enter a valid ID");
      return;
    }
    if (typeof password !== "string" || !password.trim()) {
      alert("Please enter a valid password");
      return;
    }
    signupUser(user);
  };

  return (
    <div className="signup">
      <h3>Signup</h3>

      <div className="signup-field">
        <form className="signup-form" onSubmit={handleSignupSubmit}>
          <input type="text" name="id" placeholder="Username" autoComplete="off" onChange={handleValueChange} value={user.title} maxLength="30" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            onChange={handleValueChange}
            value={user.password}
            maxLength="30"
          />
          <select name="id" value={user.title} onChange={handleValueChange}>
            <option value="편집자">편집자</option>
            <option value="유튜버">유튜버</option>
          </select>
          <input type="text" name="id" placeholder="Nickname" autoComplete="off" onChange={handleValueChange} value={user.title} maxLength="30" />

          <button style={{ width: "75%", marginTop: "10px" }}>Signup</button>
        </form>
      </div>
      <span>{/* <Link className="back-link" to="/">{`> 돌아가기! <`}</Link> */}</span>
    </div>
  );
};
