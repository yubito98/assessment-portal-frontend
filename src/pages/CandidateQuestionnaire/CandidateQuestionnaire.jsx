import "./CandidateQuestionnaire.scss";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import Timer from "../../components/Timer/Timer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProgressBar from "../../components/ProgressBar/ProgressBar";

function CandidateQuestionnaire() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState("");
  const [candidateAssessment, setCandidateAssessment] = useState({});
  const [totalResponses, setTotalResponses] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState({});
  const [testCompleted, setTestCompleted] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const headers = { "Content-Type": "application/json" };

  const getCandidateAssessment = async () => {
    try {
      const response = await axios.get(`https://api.quotient-ai.com/api/candidate-assessments/${id}`, { headers, withCredentials: true });
      const data = response.data;
      setCandidate(data.name);
      setCandidateAssessment(data.assessment);
      await getQuestion(data.assessment.assessment_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestion = async (assessmentId) => {
    try {
      const response = await axios.get(`https://api.quotient-ai.com/api/questions?assessment_id=${assessmentId}`, { headers, withCredentials: true });
      const data = response.data;
      setTestCompleted(data.testCompleted);
      setQuestion(data.question);
      setTotalResponses(data.totalResponses);
      setTotalQuestions(data.totalQuestions);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCandidateAssessment();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (testCompleted) {
    return (
      <div className="assessment-completed">
        <h1>Congratulations! You have completed your assessment</h1>
        <p>A confirmation email will be sent to you. You may now close this tab.</p>
      </div>
    );
  }

  return (
    <div className="candidate-questionnaire">
      <div className="candidate-bar">
        <div className="candidate-name">{candidate}</div>
        <div className="questionnaire-progress">
          <span className="assessment-name">{candidateAssessment.name}</span>
          <ProgressBar progress={(totalResponses / totalQuestions) * 100} />
        </div>
        <div className="stop-button">
          <Timer timeSpent={candidateAssessment.time_spent ?? 0} />
        </div>
      </div>
      <Questionnaire assessmentId={candidateAssessment.assessment_id} normGroup={candidateAssessment.norm_group_name} question={question} getQuestion={getQuestion} />
    </div>
  );
}

export default CandidateQuestionnaire;
