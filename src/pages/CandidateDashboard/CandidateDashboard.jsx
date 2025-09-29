import "./CandidateDashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [candidateName, setCandidateName] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [instructions, setInstructions] = useState(false);
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

  const takeAssessment = async (event) => {
    navigate(`/candidate/dashboard/${event.currentTarget.id}`);
  };

  const normGroup = "New Edge Growth Team"

  useEffect(() => {
    getCandidateAssessments();
  }, []);

  return (
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
        <span className="instructions-button" onClick={() => setInstructions(!instructions)}>See Instructions <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="#df5700" stroke-width="1.5"></path>
        </svg></span>
      </div>
      <div className={instructions ? "instructions-active":"instructions"}>
        <h2>Welcome to the Q-Assessment for {normGroup}</h2>

        <div class="section">
          <p>
            The Q-Assessment is designed to uncover how you naturally work, think, and collaborate. It helps {normGroup} understand your strengths and how you can thrive in your role. These insights also support your development by giving you tools to grow your career, strengthen your
            impact, and prepare for future opportunities.
          </p>
          <p>
            The assessment takes about <strong>30–40 minutes</strong>. You don’t need to finish in one sitting. Your progress saves automatically, and you can return at any time to pick up where you left off. Please keep your username and password, as you’ll need them if you restart.
          </p>
          <p>Once you’re finished, {normGroup} will be notified.</p>
          <p>If you run into any technical hiccups, please reach out to &lt;Company Recruiter Email&gt;.</p>
        </div>

        <h2>How to Approach the Q-Assessment</h2>
        <div class="section">
          <p>Think about how you see yourself right now, not how you’d like to be in the future. Answer as honestly as possible, and don’t worry about getting the “right” answer — there aren’t any. The more authentic you are, the more useful the results will be for you and the team.</p>
          <p>
            <strong>A couple of tips before you start:</strong>
          </p>
          <ul>
            <li>Find a quiet space where you can focus.</li>
            <li>Take your time, but don’t overthink it. Your first reaction is usually best.</li>
            <li>Once you select an option for a question, you won’t be able to change it.</li>
          </ul>
          <p>
            <strong>For each statement, choose the option that best describes you:</strong>
          </p>
          <ul>
            <li>Very Inaccurate</li>
            <li>Moderately Inaccurate</li>
            <li>Slightly Inaccurate</li>
            <li>Neither Accurate Nor Inaccurate</li>
            <li>Slightly Accurate</li>
            <li>Moderately Accurate</li>
            <li>Very Accurate</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;
