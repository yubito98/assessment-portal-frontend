import "./NormGroupsTable.scss";
import axios from "axios";
import { useState, useEffect } from "react";

function NormGroupsTable() {
  const headers = {
    "Content-Type": "application/json",
  };

  const [groups, setGroups] = useState([]);

  const getNormGroups = async () => {
    try {
      const response = await axios.get("https://api.quotient-ai.com/api/groups", { headers, withCredentials: true });
      const data = response.data;
      console.log(data);
      setGroups(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNormGroups();
  }, []);
  return (
    <div className="groups-table">
      <h2 className="">Norm Groups</h2>
      <div className="container">
        <div className="header">
          <div className="column">Name</div>
          <div className="column">Average Score</div>
          <div className="column">Standard Deviation</div>
          <div className="column"></div>
        </div>
        <div className="body">
          {groups.length > 0
            ? groups.map((group) => (
                <div key={group.id} className="row">
                  <div className="column">{group.name}</div>
                  <div className="column"></div>
                  <div className="column"></div>
                  <div className="column">
                    <button className="secondary-button">Calculate</button>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default NormGroupsTable;
