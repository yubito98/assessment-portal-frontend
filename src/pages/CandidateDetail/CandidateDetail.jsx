import "./CandidateDetail.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import CandidateHero from "../../components/CandidateHero/CandidateHero";
import CandidateOverview from "../../components/CandidateOverview/CandidateOverview";
import AccordionList from "../../components/AccordionList/AccordionList";

function CandidateDetail() {
  const [candidateAssessments, setCandidateAssessments] = useState([]);
  const [assessmentSelected, setAssessmentSelected] = useState();
  const headers = {
    "Content-Type": "application/json",
  };

  const { id } = useParams();

  const getCandidateDetail = async () => {
    try {
      const response = await axios.get(`https://api.quotient-ai.com/api/candidates/${id}`, { headers, withCredentials: true });
      console.log(response.data);
      if (response.data.length > 1) {
        setCandidateAssessments(response.data);
      } else {
        setAssessmentSelected(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectCandidateAssessment = (event) => {
    const assessment = candidateAssessments.filter((item) => item.candidate.candidate_assessment_id === parseInt(event.currentTarget.id));
    setAssessmentSelected(assessment[0]);
    console.log(event.currentTarget.id);
  };

  const calculateTscore = async () => {
    try {
      const response = await axios.post(
        `https://api.quotient-ai.com/api/attributes`,
        {
          candidate_id: id,
          assessment_id: assessmentSelected.candidate.assessment_id,
          candidate_assessment_id: assessmentSelected.candidate.candidate_assessment_id,
          norm_group_id: assessmentSelected.candidate.norm_group_id,
          is_norm: assessmentSelected.candidate.is_norm,
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
      <Header role={1} />
      {assessmentSelected ? (
        <>
          <CandidateHero candidate={assessmentSelected.candidate} />
          <CandidateOverview />
          <AccordionList assessmentId={assessmentSelected.candidate.assessment_id} attributes={assessmentSelected.attributes} />
          <div className="container-standar">
            <div className="group-detail">
              <h1>Scores</h1>
              {assessmentSelected.attributes.map((item) => (
                <li key={item.name}>
                  <strong>{item.name}:</strong> {item.t_score}
                </li>
              ))}
            </div>
            <button onClick={calculateTscore}>Calculate TScore</button>
          </div>
        </>
      ) : (
        <div className="assessments-container">
          <div className="card">
            <h1>Select the assessment you would like to review for this candidate</h1>
            {candidateAssessments
              .sort((a, b) => a.candidate.assessment_name.localeCompare(b.candidate.assessment_name))
              .map((item) => (
                <div onClick={selectCandidateAssessment} className="candidate-assessment-option" id={item.candidate.candidate_assessment_id} key={item.candidate.candidate_assessment_id}>
                  <span className="name">{item.candidate.assessment_name}</span>
                  <span className={`${item.candidate.status} status`}>{item.candidate.status || "Sent"}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default CandidateDetail;
