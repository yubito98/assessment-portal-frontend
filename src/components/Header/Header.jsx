import "./Header.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "../../assets/images/profile-placeholder.svg";
import { handleLogout } from "../../utils/handleLogOut";

function Header({ name, role, companyName }) {
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
          <h3>{companyName}</h3>
        </div>
        <div className="nav">
          <ul className="menu">
            <li onClick={() => (role == 1 ? navigate("/dashboard") : navigate("/candidate/dashboard"))}>Dashboard</li>
          </ul>
          <div className={profileToggle ? "header-profile-active header-profile" : "header-profile"}>
            <div onClick={handleProfileToggle} className="header-profile-avatar">
              <img width={"30px"} height={"30px"} src={profilePlaceholder} />
              <span className="header-profile-avatar-name">{name}</span>
            </div>
            <div className="header-profile-options">
              <ul ref={headerProfile}>
                {role == 2 ? <li onClick={() => navigate("/candidate/reset-password")}>Reset Password</li> : ""}
                <li onClick={() => handleLogout(role)}>Log Out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
