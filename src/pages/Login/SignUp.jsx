import "./Login.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);
    if (!formData.name) {
      setError("Name is required");
      return;
    }
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("password is required");
      return;
    }

    try {
      const response = await axios.post("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/users", formData, { headers });
      const data = response.data;
      console.log(data);
      alert("You have created a new account. Now you can Log in");
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="login">
      <div className="column">
        <form onSubmit={handleSubmit}>
          <h3>Sign up</h3>
          <input type="text" name="name" placeholder="Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <p>
            Do you already have an account? Log in{" "}
            <a href="/">
              <strong>here</strong>
            </a>
          </p>
          {error ? <div className="form-error">{error}</div> : ""}
          <button type="submit" className="secondary-button">
            Sign up
          </button>
        </form>
      </div>
      <div className="column rigth">
        <h1>Assessment Portal</h1>
      </div>
    </div>
  );
}

export default SignUp;
