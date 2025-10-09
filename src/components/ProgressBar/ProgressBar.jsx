import "./ProgressBar.scss";

function ProgressBar({displayValue, progress}) {
  return (
    <div className="progress-bar">
      <div className="bar">
        <div  style={{width:`${progress || 0}%`}} className="progress"></div>
      </div>
      <div className={displayValue ? "value active":"value"}>{progress ? `${Math.round(progress)}%` : "0%"}</div>
    </div>
  );
}

export default ProgressBar;
