import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <nav className="header-bar">
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="matching">Matching</Link>

        <Link to="board">Board</Link>
      </div>
      <div className="right-side-menu">
        <Link to="signup">Signup</Link>
        <Link to="login">Login</Link>
        <Link to="chat">Chat</Link>
        <Link to="myprofile">Myprofile</Link>
      </div>
    </nav>
  );
};
