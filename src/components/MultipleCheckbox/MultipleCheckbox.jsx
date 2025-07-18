import "./MultipleCheckbox.scss";
import { useState, useEffect } from "react";
import axios from "axios";

function MultipleCheckbox({ getOptions }) {
  const [assessments, setAssessments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const getAssessment = async () => {
    try {
      const response = await axios.get(
        "https://assesstment-portal-backend-746f450dcb6b.herokuapp.com/api/assessments",
        {
          withCredentials: true,
        }
      );
      setAssessments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedOptions = (item) => {
    const isAlreadySelected = selectedOptions.some((opt) => opt.id === item.id);
    if (!isAlreadySelected) {
      setSelectedOptions([...selectedOptions, item]);
    }
  };

  useEffect(() => {
    getAssessment();
  }, []);

  useEffect(() => {
    getOptions(selectedOptions);
  }, [selectedOptions]);

  return (
    <div
      onClick={() => setShowOptions(!showOptions)}
      className={showOptions ? "multiple-checkbox active" : "multiple-checkbox"}
    >
      <div className="selected">
        {selectedOptions.length < 1
          ? "Select assessment"
          : selectedOptions.map((item, index) => (
              <div key={index} className="item">
                {item.name}
              </div>
            ))}
      </div>
      <div className="options">
        {assessments.map((item, index) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleSelectedOptions(item);
            }}
            key={index}
            className="item"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleCheckbox;
