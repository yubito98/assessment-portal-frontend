import "./Dashboard.scss";
import CandidatesTable from "../../components/CandidatesTable/CandidatesTable";
import CreateCandidateButton from "../../components/CreateCandidateButton/CreateCandidateButton";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate()
  const [data, setData] = useState({});

  const headers = {
    "Content-Type": "application/json",
  };

  const getData = async () => {
    try {
      const response = await axios.get("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates", { headers, withCredentials: true });
      const data = response.data;
      console.log(data);
      setData(data);
    } catch (error) {
      navigate("/")
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header recruiter={data.recruiter_name}/>
      <div className="dashboard">
        <div className="top">
          <Filters />
          <CreateCandidateButton />
        </div>
        <CandidatesTable />
      </div>
    </>
  );
}

export default Dashboard;
