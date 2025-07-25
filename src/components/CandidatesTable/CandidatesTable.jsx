import "./CandidatesTable.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CandidatesTable({ candidates = [] }) {

  const navigate = useNavigate()

  return (
    <div className="candidates-table">
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="column">Name</div>
            <div className="column">Last Name</div>
            <div className="column">Email</div>
            <div className="column">Norm Group</div>
            <div className="column">Assessments</div>
            <div className="column">Status</div>
            <div className="column">Progress</div>
            <div className="column">Score</div>
            <div className="column">Send Date</div>
            <div className="column">Completion Date</div>
          </div>
        </div>
        <div className="body">
          {candidates.length < 1
            ? "There are no candidates"
            : candidates.map(([id, data]) => (
                <div onClick={() => navigate(`/dashboard/${id}`)} key={id} className="row">
                  <div className="column">{data.name}</div>
                  <div className="column">{data.last_name}</div>
                  <div className="column">{data.email}</div>
                  <div className="column">{data.norm_group}</div>
                  <div className="assessment-column column">
                    {data.assessments.map((item, index) => (
                      <div key={index} className={index === 0 ? "assessment-row first-row": "assessment-row"}>
                        <div className="column">{item.name}</div>
                        <div className="column">{item.status || "Inactive"}</div>
                        <div className="column">{item.progress || "0%"}</div>
                        <div className="column">{item.score || "0"}</div>
                        <div className="column">{item.send_date ? new Date(item.send_date).toLocaleDateString() : "—"}</div>
                        <div className="column">{item.completion_date ? new Date(item.completion_date).toLocaleDateString() : "—"}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CandidatesTable;
