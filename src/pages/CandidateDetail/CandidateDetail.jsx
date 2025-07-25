import "./CandidateDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";

function CandidateDetail() {
const [recruiter, setRecruiter] = useState("");
  const [candidate, setCandidate] = useState({});
  const headers = {
    "Content-Type": "application/json",
  };

  const { id } = useParams();

  const getCandidateDetail = async () => {
    try {
      const response = await axios.get(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates/${id}`, { headers, withCredentials: true });
      console.log(response.data);
      setRecruiter(response.data.recruiter)
      setCandidate(response.data.candidate[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidateDetail();
  }, []);
  return (
    <>
      <Header recruiter={recruiter} />
      <div className="candidate-detail">
        <h1>Candidate detail</h1>
        <li><strong>Name:</strong> {candidate.candidate_name}</li>
        <li><strong>Email:</strong> {candidate.email}</li>
      </div>
    </>
  );
}

export default CandidateDetail;
