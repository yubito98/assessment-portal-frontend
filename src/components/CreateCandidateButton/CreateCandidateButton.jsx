import "./CreateCandidateButton.scss";
import { useState, useRef, useEffect } from "react";
import CloseButton from "../CloseButton/CloseButton";

function CreateCandidateButton() {
  const [modal, setModal] = useState(false);

  const form = useRef(null);

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
        <form ref={form}>
          <CloseButton onClick={() => setModal(!modal)} />
          <h3 style={{marginBottom: "15px"}}>Candidate Creation</h3>
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
            <select name="assessments">
              <option>Select Assessment</option>
              <option>Select Assessment 1</option>
              <option>Select Assessment 2</option>
            </select>
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
