import "./CloseButton.scss"

function CloseButton({onClick}){
    return(
        <div onClick={onClick} className="close-button">
            X
        </div>
    )
}


export default CloseButton