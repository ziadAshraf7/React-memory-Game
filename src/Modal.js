

const Modal = (props) =>{

    let {setModalAccsesFunc , ModalAccses , EndGameMassage} = props.props

return (
    <div style={ModalAccses ? {transform : "scale(100%)" } : {transform : "scale(0)"}} className="Modal">
        <div>
        <p>{EndGameMassage.current}</p>
        <div>
        <button onClick={setModalAccsesFunc}>Close</button>
        </div>
    </div>
    </div>
)


}


export default Modal