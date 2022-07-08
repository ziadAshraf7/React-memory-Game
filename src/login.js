import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useEffect } from "react";
const Login = (props) => {

  const {Auth} = props.props
  const navigate = useNavigate()
  let Email= useRef("")
  let Password  = useRef("")
  let [LogigngInError , setLogigngInError] = useState(false)
  let ErrorMessage = useRef("")
  let [logingIn , setlogingIn] = useState(false)



  const LogInFunc = (e , Email , Password) => {
    e.preventDefault()
    setlogingIn(true)
    signInWithEmailAndPassword(Auth , Email , Password).then(
      (cred) => {
        navigate("../game")
      }
    ).catch(err => {
      setLogigngInError(true)
      setlogingIn(false)
      
        let Error = String(err)

      if(Error.includes("wrong-password")){
        ErrorMessage.current = "Your Password is Incorrect"
      }else if(Error.includes("user-not-found")){
        ErrorMessage.current = "Your Account doesn't Exist"
      }else{
        ErrorMessage.current = "Connection Failed , please check your Connection"

      }


    })

  }

  useEffect(() =>{
    if(LogigngInError == true){
      setTimeout(() => {
        setLogigngInError(false)
      }, 4000);
    }
  },[LogigngInError])



    return ( 
      <>
         <form onSubmit={(e) => LogInFunc(e , Email.current,Password.current)} className="Form">
          {LogigngInError && <div className="Error">{ErrorMessage.current}</div>}
          <p className='FormHeader'>Login</p>
          <input type="email"  onChange={(e) => Email.current = e.target.value} placeholder="E-mail" required />
          <input type="password"  onChange={(e) => Password.current = e.target.value} placeholder="Password" required/>
        { !logingIn &&  <input type={"submit"} value = {"LogIn"} className="btn"/>}
        { logingIn &&  <input type={"submit"} value = {"Loging in ..."} className="btn"/>}
        </form>
    </>
     );
}
 
export default Login;