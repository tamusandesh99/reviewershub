import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { ImUser } from "react-icons/im";
import { HiMiniLockClosed } from "react-icons/hi2";
import CSRFToken from "../CSRFToken";
import "./index.scss";
import { useNavigate, Link } from "react-router-dom";

const UserLogin = ({ login, isAuthenticated }) => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const onChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to home page after successful login
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="form-container-login">
        <form className="login-form" onSubmit={handleLogin}>
          <CSRFToken />
          <div className="form-title">
            <p>Login</p>
          </div>
          <div className="form-group">
            <ImUser className="form-icon"></ImUser>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
              placeholder="Enter you username"
            />
          </div>
          <div className="form-group">
            <HiMiniLockClosed className="form-icon"></HiMiniLockClosed>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Password"
            />
          </div>
          <div className="form-button">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="">
          Don't have an account? <Link to="/register">Signup</Link>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(UserLogin);
