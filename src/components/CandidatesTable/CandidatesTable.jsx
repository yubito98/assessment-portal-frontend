import "./CandidatesTable.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";

function CandidatesTable({ candidates = [] }) {
  const navigate = useNavigate();

  return (
    <div className="candidates-table">
      <div className="container">
        <div className="header">
          <div className="row">
            <div className="column">Name</div>
            <div className="column">Last Name</div>
            <div className="column">Email</div>
            <div className="column">Assessment</div>
            <div className="column">Status</div>
            <div className="column">Progress</div>
            <div className="column">Is Norm?</div>
            <div className="column">Norm Group</div>
            <div className="column">Time Spent</div>
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
                  <div className="assessment-column column">
                    {data.assessments.map((item, index) => (
                      <div key={index} className="assessment-row">
                        <div className="column">{item.name}</div>
                        <div className="column">{item.status || "Inactive"}</div>
                        <div className="column">
                          <ProgressBar progress={item.progress} />
                        </div>
                        <div className="column">{item.is_norm === true ? "True" : "False"}</div>
                        <div className="column">{item.norm_group}</div>
                        <div className="column">{item.time_spent ? item.time_spent + "s" : "0s"}</div>
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
