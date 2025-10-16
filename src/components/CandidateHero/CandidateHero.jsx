import "./CandidateHero.scss";
import report from "../../assets/images/report.png";

function CandidateHero({ candidate }) {
  return (
    <section className="candidate-hero">
      <div className="container-standar container">
        <h1 className="title">{candidate.assessment_name} Report</h1>
        <div className="row">
          <div className="column content">
            <div className="item">
              <label>Candidate Name:</label>
              <p>{candidate.candidate_name}</p>
            </div>
            <div className="item">
              <label>Email:</label>
              <p>{candidate.email}</p>
            </div>
            <div className="item">
              <label>Open Position:</label>
              <p>{candidate.norm_group_name}</p>
            </div>

            <div className="item">
              <label>Status:</label>
              <p>{candidate.status}</p>
            </div>
            {candidate.send_date ? (
              <div className="item">
                <label>Sent Date:</label>
                <p>{new Date(candidate.send_date).toLocaleDateString("en-US")}</p>
              </div>
            ) : null}
            {candidate.start_date? (
              <div className="item">
                <label>Sent Date:</label>
                <p>{new Date(candidate.send_date).toLocaleDateString("en-US")}</p>
              </div>
            ) : null}
            {candidate.completion_date ? (
              <div className="item">
                <label>Sent Date:</label>
                <p>{new Date(candidate.send_date).toLocaleDateString("en-US")}</p>
              </div>
            ) : null}

            <div className="item">
              <label>Time to complete:</label>
              <p>{candidate.time_spent}</p>
            </div>
          </div>
          <div className="column graphic">
            <img src={report} />
            <h3 className="title">ELITE PERFORMER</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateHero;
