import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [candidateName, setCandidateName] = useState("");
  const [assessments, setAssessments] = useState([])
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };
  const getCandidateAssessments = async () => {
    try {
      const response = await axios.get("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidate-assessments", { headers, withCredentials: true });
      console.log(response.data);
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
      <h1>Assessments</h1>
    </div>
  );
}

export default CandidateDashboard;
