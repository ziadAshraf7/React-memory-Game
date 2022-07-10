import React, { useEffect } from "react"
import { useContext } from "react"
import { GoogleAuthProvider  , FacebookAuthProvider , signInWithPopup} from "@firebase/auth"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Context } from "./App"
import SignupComp from "./signUpForm";
import Login from "./login";
import CredSignUpForm from "./CredSignUp"
import CredErrorComponent from "./CredError"

const SignUpLogin =(props) =>  {
  let navigate = useNavigate()
  const Auth = props.Auth
  const Usersdb = props.Usersdb  
  let [CredError , setCredError] = useState(false)
  let [CredErrormessage , setCredErrormessage] = useState()
  let [SignUpLoginStatus , setSignUpLoginStatus] = useState(true)


  let {CredStatusFunc , Authenticated , CredSignUpUser} = useContext(Context)



  useEffect(() =>{
    if(Authenticated){
      navigate("../game")
    }
  },[Authenticated])

 

 

  
  let SignInWithCredential = (CredintialCase) =>{
      let Provider = ""
      CredintialCase == "Facebook" ? Provider = new FacebookAuthProvider() : Provider = new GoogleAuthProvider()
      Provider.addScope('email');


      signInWithPopup(Auth , Provider).then(
        (res) => {
          CredStatusFunc(true)
        }
      ).catch(
        (err) =>{
          if(String(err).includes("auth/popup-closed-by-user") || String(err).includes("auth/cancelled-popup-request")){
            return
          }else{
            if(String(err).includes("auth/account-exists-with-different-credential")){
              setCredError(true)
              setCredErrormessage("This Account is exist with different Credential")
            }else{
              setCredError(true)
              setCredErrormessage(String(err))
            }
            setTimeout(() => {
              setCredError(false)
            }, 4000);
          }
     
        }
      )
    
  }
  
 
    return ( 
      <>
      <div className='CoverPic'><img src={require("./img/b7ffa7fc9c4ceafa0013dfa3f803bcc8.jpg").default}/></div>
      <CredSignUpForm props = {{CredSignUpUser}} />

<CredErrorComponent props = {{CredError , CredErrormessage}}/>
      <div className="SignupLoginWrapper">

  

        {SignUpLoginStatus && <SignupComp props={{Auth , Usersdb , CredError}} />}
        {!SignUpLoginStatus && <Login  props = {{Auth}}/>}
        <div className="Credential">
            <button className="Facebook" onClick={() => SignInWithCredential("Facebook")}><img src={require("./img/facebook-logo-png-38360.png").default}/></button>
            <button className="Google" onClick={() => SignInWithCredential("Google")}><img src={require("./img/google-logo-png-open-2000.png").default} /></button>
          </div>
          <div className="SignUpLoginStatus">
      <input type={"button"} value={SignUpLoginStatus ? "Login?" : "SignUp?"} onClick={() => setSignUpLoginStatus(!SignUpLoginStatus)}/>
          </div>

        </div>
        </>
     );
}
 
export default SignUpLogin;