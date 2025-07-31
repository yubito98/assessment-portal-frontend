import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Timer.scss";

function Timer() {
  const headers = {
    "Content-Type": "application/json",
  };

  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const stopAssessment = () => {
    // send time to candidateAssessment
    navigate("/candidate/dashboard");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer">
      <div>
        <span>
          <strong>Time Spent: </strong>
        </span>
        <span className="value">{seconds}</span>
      </div>
      <button onClick={stopAssessment} className="secondary-button">
        Stop
      </button>
    </div>
  );
}

export default Timer;
