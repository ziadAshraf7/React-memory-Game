import { signOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Context} from "./App"

let CredSignUpForm = (props) =>{
    let UserName = useRef("")
    let {CredSignUpUser} = props.props
    let {UserInfo,Usersdb ,Auth , CredStatusFunc , CredSignUpUserFunc} = useContext(Context)
    let [confirm , setconfirming] = useState(false)
    let navigate = useNavigate()

    let {userId , EmailAddress } = UserInfo.current

 

    let NewUserData = (e ,userName) =>{
        e.preventDefault()
        setconfirming(true)
            setDoc(doc(Usersdb , "users" , userId) , {
              Name : userName ,
              Email : EmailAddress ,
              history : []
          }).then(
            (res) => {
                navigate("../game")  
            }
          ).catch(
            (err) => {console.log(err)}
          )
           // create a document data for the new user
    }   


    let ReturnBack = () =>{
        CredStatusFunc(false) 
        CredSignUpUserFunc()
        signOut(Auth)
    }

    return(
        <div style={CredSignUpUser  ? {transform : "translateX(0)"  } : {transform : "translateX(100%)" }}  className="CredSignUpForm">
           <button onClick={ReturnBack} style={{position : "absolute" , left : "10px" , top : "10px"}}><img style={{width : "30px" , height : "30px" , cursor : "pointer"}} src={require("./img/—Pngtree—vector left arrow icon_4184717.png").default} /></button>
           <div className="FormContainer">
            <form className="Form">
            <input type="text" onChange={(e) => UserName.current = e.target.value}  placeholder="Your Name" required/>
            {!confirm && <button onClick={(e) => NewUserData(e ,UserName.current)} className="btn">Submit</button>}
            {confirm && <button  className="btn">Submiting</button>}
            </form>
            </div>
        </div>
    )
}

export default CredSignUpForm