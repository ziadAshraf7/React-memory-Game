

let CredErrorComponent = (props) =>{
    let {CredError} = props.props
    
    return (
        <div style={CredError ? {transform : "translateY(0)"} : {transform : "translateY(-100%)"}} className="CredError">
            <p>This Account is already Exist with different Credential</p>
        </div>
    )
}

export default CredErrorComponent