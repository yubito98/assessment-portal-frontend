import CloseButton from "../CloseButton/CloseButton";
import "./ModalConfirmation.scss"

function ModalConfirmation({ state, onClose, message, yesButton }) {
  if (state) {
    return (
      <div style={{zIndex:"3"}} className="modal modal-confirmation">
        <div className="container">
          <CloseButton onClick={onClose} />
          <p>{message}</p>
          <div className="buttons">
            <button onClick={yesButton}  className="secondary-button">Yes</button>
            <button onClick={onClose} className="primary-button">No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalConfirmation;
