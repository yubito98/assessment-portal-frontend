import CloseButton from "../CloseButton/CloseButton";
import "./ModalConfirmation.scss"

function ModalConfirmation({ state, onClose, message, yesButton, yesButtonText, noButtonText }) {
  if (state) {
    return (
      <div style={{zIndex:"3"}} className="modal modal-confirmation">
        <div className="container">
          <CloseButton onClick={onClose} />
          <p>{message}</p>
          <div className="buttons">
            <button onClick={yesButton}  className="secondary-button">{yesButtonText}</button>
            <button onClick={onClose} className="primary-button">{noButtonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalConfirmation;
