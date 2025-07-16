import "./Dashboard.scss";
import CandidatesTable from "../../components/CandidatesTable/CandidatesTable";
import CreateCandidateButton from "../../components/CreateCandidateButton/CreateCandidateButton";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const getData = async () => {
    try {
      const response = await axios.get("https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates", { headers, withCredentials: true });
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
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
