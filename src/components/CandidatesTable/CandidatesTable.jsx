import "./CandidatesTable.scss"


function CandidatesTable() {
  return (
    <div className="candidates-table">
      <div className="header">
        <div className="column">Name</div>
        <div className="column">Email</div>
        <div className="column">Assessments</div>
        <div className="column">Progress</div>
        <div className="column">Status</div>
        <div className="column">Created At</div>
      </div>
      <div className="body">
        <div className="row">
          <div className="column">Yubor</div>
          <div className="column">yubor98@gmail.com</div>
          <div className="column assessments">
            <span>Assessment 1</span>
            <span>Assessment 2</span>
          </div>
          <div className="column">Progress</div>
          <div className="column">In progress</div>
          <div className="column">7/10/2025</div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesTable;
