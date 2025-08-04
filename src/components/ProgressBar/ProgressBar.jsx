import "./ProgressBar.scss";

function ProgressBar({progress}) {
  return (
    <div className="progress-bar">
      <div className="bar">
        <div  style={{width:`${progress || 0}%`}} className="progress"></div>
      </div>
      <div className="value">{progress ? `${progress}%` : "0%"}</div>
    </div>
  );
}

export default ProgressBar;
