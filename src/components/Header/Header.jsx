import "./Header.scss";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import profilePlaceholder from "../../assets/images/profile-placeholder.svg";

function Header() {
  const [profileToggle, setProfileToggle] = useState(false);
  const navigate = useNavigate();

  const headerProfile = useRef(null);

  const handleProfileToggle = () => {
    setProfileToggle(!profileToggle);
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
            <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          </ul>
          <div className={profileToggle ? "header-profile-active header-profile" : "header-profile"}>
            <div onClick={handleProfileToggle} className="header-profile-avatar">
              <img width={"30px"} height={"30px"} src={profilePlaceholder} />
              <span className="header-profile-avatar-name">test</span>
            </div>
            <div className="header-profile-options">
              <ul ref={headerProfile}>
                <li>Profile</li>
                <li>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
