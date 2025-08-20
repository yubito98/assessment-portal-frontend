import "./CandidateDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";

function CandidateDetail() {
  const [recruiter, setRecruiter] = useState("");
  const [candidate, setCandidate] = useState({});
  const [attributes, setAttributes] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };

  const { id } = useParams();

  const getCandidateDetail = async () => {
    try {
      const response = await axios.get(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates/${id}`, { headers, withCredentials: true });
      console.log(response.data);
      setRecruiter(response.data.recruiter);
      setCandidate(response.data.candidate);
      setAttributes(response.data.attributes);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTscore = async () => {
    try {
      const response = await axios.post(
        `https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/attributes`,
        {
          candidate_id: id,
          assessment_id: candidate.assessment_id,
          candidate_assessment_id: candidate.candidate_assessment_id,
          norm_group_id: candidate.norm_group_id,
          is_norm: candidate.is_norm,
        },
        { headers, withCredentials: true }
      );
      console.log(response.data);
      getCandidateDetail();
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
        <div className="group-detail">
          <h1>Candidate Info</h1>
          <li>
            <strong>Name:</strong> {candidate.candidate_name}
          </li>
          <li>
            <strong>Email:</strong> {candidate.email}
          </li>
        </div>
        <div className="group-detail">
          <h1>Assessment Info</h1>
          <li>
            <strong>Name:</strong> {candidate.assessment_name}
          </li>
          <li>
            <strong>Role:</strong> {candidate.norm_group_name}
          </li>
          <li>
            <strong>Status:</strong> {candidate.status}
          </li>
          <li>
            <strong>Progress:</strong> {candidate.progress}%
          </li>
        </div>
        <div className="group-detail">
          <h1>Scores</h1>
          {attributes.map((item) => (
            <li>
              <strong>{item.name}:</strong> {item.t_score}
            </li>
          ))}
        </div>
        <button onClick={calculateTscore}>Calculate TScore</button>
      </div>
    </>
  );
}

export default CandidateDetail;
