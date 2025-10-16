import "./CreateCandidateButton.scss";
import { useState, useRef, useEffect } from "react";
import CloseButton from "../CloseButton/CloseButton";
import MultipleCheckbox from "../MultipleCheckbox/MultipleCheckbox";
import axios from "axios";

function CreateCandidateButton({ refreshCandidates }) {
  const [modal, setModal] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [normGroups, setNormGroups] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const form = useRef(null);

  const getOptions = (options) => {
    setAssessments(options);
  };

  const getNormGroups = async () => {
    try {
      const response = await axios.get("https://api.quotient-ai.com/api/groups", { headers, withCredentials: true });
      const data = response.data;
      console.log(data);
      setNormGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form);
      const { name, lastName, email, password, isNorm, normGroup } = formData;
      const response = await axios.post(
        "https://api.quotient-ai.com/api/candidates",
        { name, lastName, email, password, isNorm, normGroup, assessments: assessments },
        {
          withCredentials: true,
        }
      );
      setModal(!modal);
      refreshCandidates();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNormGroups();

    function handleClickOutside(event) {
      if (!form.current.contains(event.target)) {
        setModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <button className="secondary-button" onClick={() => setModal(!modal)}>
        Create Candidate
      </button>
      <div className={modal ? "candidate-form active" : "candidate-form"}>
        <form onSubmit={handleSubmit} ref={form}>
          <CloseButton onClick={() => setModal(!modal)} />
          <h3 style={{ marginBottom: "15px" }}>Candidate Creation</h3>
          <div>
            <input type="text" name="name" placeholder="Name" />
          </div>
          <div>
            <input type="text" name="lastName" placeholder="Last Name" />
          </div>
          <div>
            <input type="email" name="email" placeholder="Email" />
          </div>
          <div>
            <input type="password" name="password" placeholder="password" />
          </div>
          <div className="options-group">
            <select name="isNorm">
              <option>Is Norm?</option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
            <select name="normGroup">
              <option>Select Norm Group</option>
              {normGroups.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <MultipleCheckbox getOptions={getOptions} />
          </div>
          <div className="form-button">
            <button className="secondary-button" type="submit">
              Create Candidate
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCandidateButton;
