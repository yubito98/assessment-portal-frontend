import "./CandidateResetPassword.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandidateResetPassword() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);

    if (!formData.password || !formData.password2) {
      setError("password is required");
      return;
    }

    if (formData.password !== formData.password2) {
      setError("passwords need to match");
      return;
    }

    try {
      const response = await axios.patch("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/users/update-password", formData, { headers, withCredentials: true });
      const data = response.data;
      navigate("/candidate/dashboard");
    } catch (error) {
      if (error.response.data.message === "Invalid email") {
        setError("Invalid email");
      } else if (error.response.data.message === "Invalid password") {
        setError("Invalid password");
      } else {
        setError("Something went wrong, refresh the page and try again");
      }
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="candidate-login">
      <form onSubmit={handleSubmit}>
        <h3>This is your first login, so you’ll need to create your own password.</h3>
        <input type="password" name="password" placeholder="New password" />
        <input type="password" name="password2" placeholder="Repeat new password" />
        <p>Don't have an account? ask your recruiter for instructions</p>
        {error ? <div className="form-error">{error}</div> : ""}
        <button type="submit" className="secondary-button">
          Create Password
        </button>
      </form>
    </div>
  );
}

export default CandidateResetPassword;
