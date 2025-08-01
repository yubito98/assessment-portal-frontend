import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Timer.scss";

function Timer({timeSpent}) {
  const headers = {
    "Content-Type": "application/json",
  };

  const [seconds, setSeconds] = useState(timeSpent);
  const navigate = useNavigate();
  const { id } = useParams();


  const stopAssessment = async () => {
    try {
      const response = await axios.patch(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidate-assessments/time?candidateAssessmentId=${id}`, { time: seconds }, { headers, withCredentials: true });
      const data = response.data;
      console.log(data);
      navigate("/candidate/dashboard");
    } catch (error) {
      console.log(error);
    }
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
