import "./ModalInstructions.scss";
import CloseButton from "../CloseButton/CloseButton";
import { useState, useEffect } from "react";

function ModalInstructions({ state, onClose, getStarted }) {
  const normGroup = "New Edge Growth Team";

  if (state) {
    return (
      <div className="modal">
        <div className="container">
          <CloseButton onClick={onClose} />
          <div className="modal-consent-content">
            <span onClick={getStarted} style={{color:"red", cursor:"pointer"}}>Skip Instructions >></span>
            <h2>Welcome to the Q-Assessment for {normGroup}</h2>
            <p>
              The Q-Assessment is designed to uncover how you naturally work, think, and collaborate. It helps {normGroup} understand your strengths and how you can thrive in your role. These insights also support your development by giving you tools to grow your career, strengthen your impact, and
              prepare for future opportunities.
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
            <br>
            <button className="secondary-button" onClick={getStarted}>Get Started</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalInstructions;
