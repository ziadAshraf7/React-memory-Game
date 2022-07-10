

let CredErrorComponent = (props) =>{
    let {CredError , CredErrormessage} = props.props
    
    return (
        <div style={CredError ? {transform : "translateY(0)"} : {transform : "translateY(-100%)"}} className="CredError">
            <p>{CredErrormessage}</p>
        </div>
    )
}

export default CredErrorComponent