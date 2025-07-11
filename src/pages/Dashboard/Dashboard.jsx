import "./Dashboard.scss";
import CandidatesTable from "../../components/CandidatesTable/CandidatesTable";
import CreateCandidateButton from "../../components/CreateCandidateButton/CreateCandidateButton";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
function Dashboard() {
  return (
    <>
      <Header />
      <div className="dashboard">
        <div className="top">
            <Filters/>
            <CreateCandidateButton />
        </div>
        <CandidatesTable />
      </div>
    </>
  );
}

export default Dashboard;
