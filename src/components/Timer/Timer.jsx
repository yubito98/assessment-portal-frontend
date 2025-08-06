import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Timer.scss";

function Timer({ timeSpent }) {
  const headers = {
    "Content-Type": "application/json",
  };

  const [globalSeconds, setGlobalSeconds] = useState(timeSpent);
  const [seconds, setSeconds] = useState(timeSpent);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  const stopAssessment = async () => {
    try {
      const response = await axios.patch(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidate-assessments/time?candidateAssessmentId=${id}`, { time: globalSeconds }, { headers, withCredentials: true });
      const data = response.data;
      console.log(data);
      navigate("/candidate/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalSeconds((prev) => prev + 1);
    }, 1000);
    if(seconds === 60){
      setSeconds(0)
    }else{
      setSeconds(prev => prev + 1)
    }
    
    setMinutes(Math.floor(globalSeconds / 60))
    setHours(Math.floor(globalSeconds / 3600))
    return () => clearInterval(interval);
  }, [globalSeconds]);

  
  return (
    <div className="timer">
      <div>
        <span>
          <strong>Time Spent: </strong>
        </span>
        <span className="value">
          {hours  >= 1 ? hours : "0"}h:{minutes >= 1 ? minutes : "0"}m:{seconds}s
        </span>
      </div>
      <button onClick={stopAssessment} className="secondary-button">
        Stop
      </button>
    </div>
  );
}

export default Timer;
