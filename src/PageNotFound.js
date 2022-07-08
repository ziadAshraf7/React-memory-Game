import { getAuth, signOut } from "firebase/auth"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

   
let PageNotFound = (props) =>{

    let navigate = useNavigate()
    let Authenticated = props.Authenticated
    let CredStatus = props.CredStatus
    const Auth = props.Auth

  

    return (
        <div className="Page404">
            <div className="Page404Wrapper">
            <h4>404 Page Not Found</h4>
            <button onClick={() => {
                
                if(Authenticated){
                    navigate("../game")
                    console.log("kk1")
                }else if((CredStatus == false )){
                    signOut(Auth)
                    navigate("../home")
                    console.log("kk2")

                }else if(CredStatus){
                    signOut(Auth)
                    navigate("../home")
                    console.log("kk3")

                }
                
                } } style={{ marginTop : "10px" , display : "flex" , alignItems : "center" , height : "10px" , padding : "10px" , cursor : "pointer" }}>Return To Home page</button>
            </div>
        </div>
    )
}



export default PageNotFound