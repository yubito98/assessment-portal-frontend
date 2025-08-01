import "./CandidateQuestionnaire.scss";
import Questionnaire from "../../components/Questionnaire/Questionnaire";
import Timer from "../../components/Timer/Timer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CandidateQuestionnaire() {
  const [candidate, setCandidate] = useState("");
  const [candidateAssessment, setCandidateAssessment] = useState({});
  const [totalResponses, setTotalResponses] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const headers = { "Content-Type": "application/json" };

  const getCandidateAssessment = async () => {
    try {
      const response = await axios.get(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidate-assessments/${id}`, { headers, withCredentials: true });
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
      const response = await axios.get(`https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/questions?assessment_id=${assessmentId}`, { headers, withCredentials: true });
      const data = response.data;
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

  return (
    <div className="candidate-questionnaire">
      <div className="candidate-bar">
        <div>{candidate}</div>
        <div>
          <strong>{candidateAssessment.name}</strong> {totalResponses} out of {totalQuestions} questions
        </div>
        <Timer timeSpent={candidateAssessment.time_spent ?? 0} />
      </div>
      <Questionnaire assessmentId={candidateAssessment.assessment_id} question={question} getQuestion={getQuestion} />
    </div>
  );
}

export default CandidateQuestionnaire;
