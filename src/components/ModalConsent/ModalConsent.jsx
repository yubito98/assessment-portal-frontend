import "./ModalConsent.scss";
import CloseButton from "../CloseButton/CloseButton";

function ModalConsent({ state, onClose, submitConsent}) {
  

  if (state) {
    return (
      <div className="modal">
        <div className="container">
          <CloseButton onClick={onClose} />
          <div className="modal-consent-content">
            <h3>Q-Assessment Participation Notice and Consent</h3>
            <p>
              <strong>Purpose of the Assessment</strong>
            </p>
            <p>You are being asked to complete the Q-Assessment at the request of company. The Q-Assessment is designed to provide insights into work preferences, behavior patterns, strengths, areas for development, or their talent identification process.</p>
            <p>
              <strong>Nature of the Assessment</strong>
            </p>
            <p>The Q-Assessment is a professional development and talent tool. By consenting below, you understand that this assessment is not a clinical or diagnostic assessment. There are no right or wrong answers. The assessment merely evaluates strengths and areas for growth.</p>
            <p>
              <strong>Use and Oversight</strong>
            </p>
            <p>
              Your responses are processed using analytics and models to generate results. These outputs may be used by the requesting company as part of their decision-making process. The assessment results will not be used as the sole basis for an employment decision, and company representatives
              review the information as part of a broader evaluation.
            </p>
            <p>
              <strong>Information Collected</strong>
            </p>
            <p>The assessment collects:</p>
            <ul>
              <li>The identification and account information you provide (such as your name, username, and email).</li>
              <li>Your responses to the Q-Assessment.</li>
              <li>Technical information required to operate the system (such as browser/device type and session details).</li>
            </ul>
            <p>
              <strong>Use and Sharing</strong>
            </p>
            <p>
              Your responses and results will be provided only to the requesting company’s authorized recruiters, HR representatives, or managers. The information is used to help guide talent development, hiring, and coaching decisions. The assessment provider does not sell or use your data for
              unrelated purposes.
            </p>
            <p>
              <strong>Security</strong>
            </p>
            <p>Appropriate administrative, technical, and physical safeguards are in place to protect your information from unauthorized access, disclosure, or misuse.</p>
            <p>
              <strong>Voluntary Participation</strong>
            </p>
            <p>Participation in the Q-Assessment is voluntary. If you decline to participate, you will not complete the assessment, and the requesting company may be unable to consider you for certain opportunities or development programs that require it.</p>
            <p>
              <strong>Consent</strong>
            </p>
            <p>By selecting one of the options below, you confirm that you have read and understood this Notice and Consent and that your participation is voluntary.</p>
            <form  onSubmit={submitConsent}>
              <div className="form-group">
                <input id="accept-cosent" name="consent" value="true" type="radio" />
                <label for="accept-cosent">I consent to participate in the Q-Assessment.</label>
              </div>
              <div className="form-group">
                <input id="decline-cosent" name="consent" value="false" type="radio" />
                <label for="decline-cosent">I decline to participate.</label>
              </div>
              <button type="submit" className="secondary-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalConsent;
