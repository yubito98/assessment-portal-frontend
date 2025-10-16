import "./CandidateDashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ModalConsent from "../../components/ModalConsent/ModalConsent";
import ModalInstructions from "../../components/ModalInstructions/ModalInstructions";
import ModalConfirmation from "../../components/ModalConfirmation/ModalConfirmation";

function CandidateDashboard() {
  const [candidateName, setCandidateName] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [consentModal, setConsentModal] = useState(false);
  const [instructionsModal, setInstructionsModal] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [consentAssessmentId, setConsentAssessmentId] = useState("");
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
  };
  const getCandidateAssessments = async () => {
    try {
      const response = await axios.get("https://api.quotient-ai.com/api/candidate-assessments", { headers, withCredentials: true });
      console.log(response.data);
      setCandidateName(response.data.name);
      setAssessments(response.data.assessments);
    } catch (error) {
      console.log(error);
      navigate("/candidate/login");
    }
  };

  const takeAssessment = async (event) => {
    let assessment = assessments.filter((item) => item.id === parseInt(event.currentTarget.id));
    setConsentAssessmentId(assessment[0].id);
    if (assessment[0].consent) {
      setInstructionsModal(true);
    } else {
      setConsentModal(true);
    }
  };

  const submitConsent = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form);
      const { consent } = formData;
      const parsedConsent = consent === "true" ? true : false;
      if (!parsedConsent) {
        setConfirmationModal(true);
      } else {
        setConsentModal(false);
        setInstructionsModal(true);
        const response = await axios.patch(
          `https://api.quotient-ai.com/api/candidate-assessments/consent?candidateAssessmentId=${consentAssessmentId}`,
          { consent: parsedConsent },
          {
            withCredentials: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exitAssessment = () =>{
    setConfirmationModal(false)
    setConsentModal(false)
  }

  const getStarted = () => {
    console.log("Get Started", consentAssessmentId);
    navigate(`/candidate/dashboard/${consentAssessmentId}`);
  };

  useEffect(() => {
    getCandidateAssessments();
  }, []);

  return (
    <>
      <Header role={2} name={candidateName} />
      <div className="candidate-dashboard">
        <div className="card">
          <h1>Hi {candidateName || "Candidate"}</h1>
          <p>These are the assessments you have to complete:</p>
          {assessments.map((item) => (
            <div onClick={takeAssessment} id={item.id} key={item.id} className={`${item.status} item`}>
              <span className="name">{item.name}</span>
              <span className={`${item.status} status`}>{item.status || "Not started"}</span>
            </div>
          ))}
        </div>
      </div>
      <ModalConsent state={consentModal} onClose={() => setConsentModal(false)} submitConsent={submitConsent} />
      <ModalInstructions state={instructionsModal} onClose={() => setInstructionsModal(false)} getStarted={getStarted} />
      <ModalConfirmation 
        state={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        message="Do you want to exit the assessment?"
        yesButton={exitAssessment}
       />
    </>
  );
}

export default CandidateDashboard;
