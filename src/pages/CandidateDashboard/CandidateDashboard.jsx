import "./CandidateDashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [candidateName, setCandidateName] = useState("");
  const [assessments, setAssessments] = useState([]);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };
  const getCandidateAssessments = async () => {
    try {
      const response = await axios.get("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidate-assessments", { headers, withCredentials: true });
      console.log(response.data);
      setCandidateName(response.data.name);
      setAssessments(response.data.assessments);
    } catch (error) {
      console.log(error);
      navigate("/candidate/login");
    }
  };

  useEffect(() => {
    getCandidateAssessments();
  }, []);

  return (
    <div className="candidate-dashboard">
      <div className="card">
        <h1>Hi {candidateName || "Candidate"}</h1>
        <p>These are the assessments you have to complete:</p>
        {assessments.map((item, index) => (
          <div onClick={() => navigate(`/candidate/dashboard/${item.id}`)} id={item.id} key={item.id} className="item">
            <span className="name">{item.name}</span>
            <span className={`${item.status} status`}>{item.status || "Not started"}</span>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateDashboard;
