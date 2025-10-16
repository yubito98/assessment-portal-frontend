import "./CandidateLogin.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CandidateLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("password is required");
      return;
    }

    try {
      const response = await axios.post("https://api.quotient-ai.com/api/auth/login", formData, { headers, withCredentials: true });
      const data = response.data;
      console.log(data)
      if(data.first_session){
        navigate("/candidate/reset-password");
      }else{
        navigate("/candidate/dashboard");
      }
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
        <h3>Candidate Login</h3>
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <p>Don't have an account? ask your recruiter for instructions</p>
        {error ? <div className="form-error">{error}</div> : ""}
        <button type="submit" className="secondary-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default CandidateLogin;
