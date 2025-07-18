import "./CandidatesTable.scss";

function CandidatesTable({ candidates = [] }) {
  return (
    <div className="candidates-table">
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="column">Name</div>
            <div className="column">Last Name</div>
            <div className="column">Email</div>
            <div className="column">Assessments</div>
            <div className="column">Progress</div>
            <div className="column">Status</div>
            <div className="column">Score</div>
            <div className="column">Send Date</div>
            <div className="column">Completion Date</div>
          </div>
        </div>
        <div className="body">
          {candidates.length < 1
            ? "There are no candidates"
            : candidates.map((item, index) => (
                <div key={index} className="row">
                  <div className="column">{item.name}</div>
                  <div className="column">{item.last_name}</div>
                  <div className="column"></div>
                  <div className="column assessments">
                    <span></span>
                    <span></span>
                  </div>
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column"></div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CandidatesTable;
