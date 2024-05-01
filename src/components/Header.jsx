import React from "react";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import userSvg from "../assets/user.svg";
const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="navbar">
      <p className="navbar-heading">Financly.</p>
      {user ? (
        <div className="profile-pic">
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              alt="Profile Pic"
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          <p className="navbar-link" onClick={logout}>
            Logout
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
