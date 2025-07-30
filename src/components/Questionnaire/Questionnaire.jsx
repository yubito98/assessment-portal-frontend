import "./Questionnaire.scss";
function Questionnaire({ question = "" }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const formData = Object.fromEntries(form);
    console.log(formData);
  };
  return (
    <div className="questionnaire">
      <form onSubmit={handleSubmit}>
        <h1>{question.question}</h1>
        <p>Choose your answer below:</p>
        <div className="options">
          <div className="option-item">
            <input type="checkbox" id="option_1" name="option_1" value={question.option_1} placeholder="test" />
            <label htmlFor="option_1">{question.option_1}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_2" name="option_2" value={question.option_2} placeholder="test" />
            <label htmlFor="option_2">{question.option_2}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_3" name="option_3" value={question.option_3} placeholder="test" />
            <label htmlFor="option_3">{question.option_3}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_4" name="option_4" value={question.option_4} placeholder="test" />
            <label htmlFor="option_4">{question.option_4}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_5" name="option_5" value={question.option_5} placeholder="test" />
            <label htmlFor="option_5">{question.option_5}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_6" name="option_6" value={question.option_6} placeholder="test" />
            <label htmlFor="option_6">{question.option_6}</label>
          </div>
          <div className="option-item">
            <input type="checkbox" id="option_7" name="option_7" value={question.option_7} placeholder="test" />
            <label htmlFor="option_7">{question.option_7}</label>
          </div>
        </div>
        <div className="button">
          <button className="secondary-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questionnaire;
