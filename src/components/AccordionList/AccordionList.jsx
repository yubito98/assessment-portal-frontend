import "./AccordionList.scss";
import axios from "axios";
import { useState, useEffect } from "react";
function AccordionList({ attributes, assessmentId }) {
  const [constructs, setConstructs] = useState([]);

  const headers = {
    "Content-Type": "application/json",
  };

  const getConstructs = async (assessmentId) => {
    const response = await axios.get(`https://api.quotient-ai.com/api/questions/assessment?assessmentId=${assessmentId}`, { headers, withCredentials: true });
    const attributesGrouped = mergeExternalAttributes(response.data, attributes);
    console.log(attributesGrouped);
    setConstructs(attributesGrouped);
  };

function mergeExternalAttributes(constructs, externalAttributes) {
  return constructs.map((item) => {
    const attributeMap = new Map(item.attributes.map((attr) => [attr, { name: attr, t_score: null }]));

    externalAttributes.forEach((ext) => {
      if (attributeMap.has(ext.name)) {
        attributeMap.set(ext.name, { name: ext.name, t_score: ext.t_score });
      }
    });

    const attributesArray = Array.from(attributeMap.values());

    const average =
      attributesArray.reduce((total, current) => {
        return total + (current.t_score || 0); // Sum only t_score values
      }, 0) / attributesArray.length; // divide to get average

    return {
      construct: item.construct,
      average: average.toFixed(2),
      attributes: attributesArray,
    };
  });
}

  const handleAccordion = (event) => {
    event.currentTarget.parentNode.classList.toggle("active");
  };

  useEffect(() => {
    getConstructs(assessmentId);
  }, []);
  return (
    <section>
      <div className="container-small">
        {constructs.map((item, index) => (
          <div className="accordion" key={index}>
            <div onClick={handleAccordion} className="item">
              <div className="construct">
                <div className="title">
                  <span className="average">{item.average}</span>
                  <h2 className="name">{item.construct}</h2>  
                </div>
                <span>Lorem Ipsum</span>
              </div>
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.332935 1.32957C-0.110978 1.81885 -0.110978 2.61219 0.332935 3.10146L5.89387 9.22497C6.78186 10.2027 8.22069 10.2024 9.10822 9.22422L14.667 3.09695C15.111 2.60768 15.111 1.81433 14.667 1.32505C14.2231 0.835743 13.5034 0.835743 13.0595 1.32505L8.30173 6.56928C7.85785 7.05867 7.1381 7.05855 6.69422 6.56928L1.94046 1.32957C1.49656 0.840266 0.776838 0.840266 0.332935 1.32957Z"
                  fill="#003056"
                />
              </svg>
            </div>
            <div className="content">
              {item.attributes.map((attribute) => (
                <div className="attribute" key={Math.random()}>
                  <span className="name">{attribute.name}</span>
                  <span className="score">{attribute.t_score}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AccordionList;
