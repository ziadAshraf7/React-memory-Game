import { signOut } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

let Loading = (props) =>{
    let Authenticated = props.Authenticated
    let Auth = props.Auth
    let navigate  = useNavigate()
    useEffect(() =>{
        if(Authenticated === false){
            navigate("../home")
            signOut(Auth)
        }
    })
    return (
       <div style={{position : "absolute" , width : "100%" , height : "100%" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>
        <h1>Loading...</h1>
       </div>
    )
}

export default Loading