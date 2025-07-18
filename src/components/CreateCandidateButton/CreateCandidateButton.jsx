import "./CreateCandidateButton.scss";
import { useState, useRef, useEffect } from "react";
import CloseButton from "../CloseButton/CloseButton";
import MultipleCheckbox from "../MultipleCheckbox/MultipleCheckbox";
import axios from "axios";

function CreateCandidateButton() {
  const [modal, setModal] = useState(false);
  const [assessments, setAssessments] = useState([]);

  const form = useRef(null);

  const getOptions = (options) => {
    setAssessments(options);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const form = new FormData(event.target);
      const formData = Object.fromEntries(form);
      const {name, lastName, email} = formData
      console.log({name,lastName, email, assessments: assessments })
      const response = await axios.post(
        "https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/candidates",
        {name, lastName, email, assessments: assessments },
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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
