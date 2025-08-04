import "./Dashboard.scss";
import CandidatesTable from "../../components/CandidatesTable/CandidatesTable";
import CreateCandidateButton from "../../components/CreateCandidateButton/CreateCandidateButton";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState("");
  const [candidates, setCandidates] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const getData = async () => {
    try {
      const response = await axios.get("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates", { headers, withCredentials: true });
      const data = response.data;
      setRecruiter(data.recruiter);

      const obj = {};

      data.candidates.forEach((item) => {
        if (obj[item.candidate_id]) {
          obj[item.candidate_id].assessments.push({
            name: item.assessment_name,
            status: item.status,
            progress: item.progress,
            time_spent: item.time_spent,
            score: item.score,
            send_date: item.send_date,
            start_date: item.start_date,
            completion_date: item.completion_date,
          });
        } else {
          obj[item.candidate_id] = {
            name: item.candidate_name,
            last_name: item.last_name,
            email: item.email,
            is_norm: item.is_norm,
            norm_group: item.norm_group_name,
            assessments: [
              {
                name: item.assessment_name,
                status: item.status,
                progress: item.progress,
                time_spent: item.time_spent,
                score: item.score,
                send_date: item.send_date,
                start_date: item.start_date,
                completion_date: item.completion_date,
              },
            ],
          };
        }
      });

      console.log(Object.entries(obj));
      setCandidates(Object.entries(obj));
    } catch (error) {
      navigate("/");
    }
  };



  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header recruiter={recruiter} />
      <div className="dashboard">
        <div className="top">
          <div>
            <h1>Candidates Table</h1>
            <Filters />
          </div>
          <div>
            <CreateCandidateButton refreshCandidates={getData} />
          </div>
        </div>
        <CandidatesTable candidates={candidates} />
      </div>
    </>
  );
}

export default Dashboard;
