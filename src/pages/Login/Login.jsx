import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
      const response = await axios.post("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/auth/login", formData, { headers });
      const data = response.data;
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="login">
      <div className="column">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <p>
            Don't have an account? Sign up{" "}
            <a href="/signup">
              <strong>here</strong>
            </a>
          </p>
          {error ? <div className="form-error">{error}</div> : ""}
          <button type="submit" className="secondary-button">
            Login
          </button>
        </form>
      </div>
      <div className="column rigth">
        <h1>Assessment Portal</h1>
      </div>
    </div>
  );
}

export default Login;
