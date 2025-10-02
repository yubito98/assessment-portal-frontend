import "./Header.scss";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import profilePlaceholder from "../../assets/images/profile-placeholder.svg";

function Header({ name, role }) {
  const [profileToggle, setProfileToggle] = useState(false);
  const navigate = useNavigate();

  const headerProfile = useRef(null);

  const handleProfileToggle = () => {
    setProfileToggle(!profileToggle);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if(role == 1){
        navigate("/") 
      }else{
        navigate("/candidate/login")
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (!headerProfile.current.contains(event.target)) {
        setProfileToggle(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h3>Assessment Portal</h3>
        </div>
        <div className="nav">
          <ul className="menu">
            <li onClick={() => role == 1 ? navigate("/dashboard") :navigate("/candidate/dashboard") }>Dashboard</li>
          </ul>
          <div className={profileToggle ? "header-profile-active header-profile" : "header-profile"}>
            <div onClick={handleProfileToggle} className="header-profile-avatar">
              <img width={"30px"} height={"30px"} src={profilePlaceholder} />
              <span className="header-profile-avatar-name">{name}</span>
            </div>
            <div className="header-profile-options">
              <ul ref={headerProfile}>
                {role == 2 ? (<li onClick={() => navigate("/candidate/reset-password") }>Reset Password</li>):""}
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
