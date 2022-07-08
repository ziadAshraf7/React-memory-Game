import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { useContext } from "react"
import { doc , setDoc  } from "firebase/firestore"
import {  createUserWithEmailAndPassword } from "@firebase/auth"
import { useNavigate } from 'react-router-dom';

import { Context } from "./App"


let SignupComp = (props) =>{
    let navigate = useNavigate()
    let {Auth , Usersdb} = props.props
    let userName  = useRef("")
    let Email= useRef("")
    let Password  = useRef("")
    let rePassword  = useRef("")
    let ErrorMessage = useRef("")
    let [Error , setError] = useState(false)
    let [signingUp , setsigningUp] = useState(false)
  
    let {setSignUpWithEmailAndPasswordFunc } = useContext(Context)

    

    const SignUpwithEmailAndPassword = (e , EmailAddress , password , rePassword , userName) =>{
        e.preventDefault() // prevent page load
        setsigningUp(true)
        if(password == rePassword){
          createUserWithEmailAndPassword(Auth ,EmailAddress , password ).then(
            userCredential =>{ 
              setSignUpWithEmailAndPasswordFunc()
              let userId = userCredential.user.uid
              setDoc(doc(Usersdb , "users" , userId) , {
                Name : userName ,
                Email : EmailAddress ,
                history : []
            }) 
            // create a document data for the new user
            }
          ).then(
            (res) => navigate("../game")
          ).catch(error => {
            setError(true)
            setsigningUp(false)
          let err = String(error)
          if(err.includes("weak-password")){
            ErrorMessage.current = "Your Password should at least 6 Letters"
          }else if(err.includes("email-already-in-use")){
            ErrorMessage.current = "This accout is already in use"
          }else{
            ErrorMessage.current = "Connection Failed , please check your Connection"
          }
          })
        }else{
          setError(true)
          setsigningUp(false)
          ErrorMessage.current = "The Password Field must equal to re-password field"
        }
    }
  
   


    useEffect(() =>{
      if(Error == true){
        setTimeout(() => {
          setError(false)
        }, 4000);
      }
    },[Error])


    return (
        <> 
   

           
        <form onSubmit={(e) => SignUpwithEmailAndPassword(e , Email.current,Password.current,rePassword.current , userName.current)} className="Form">
        {Error && <div className="Error">{ErrorMessage.current}</div>}
        <p className='FormHeader'>SignUp</p>
        <input type="text" onChange={(e) => userName.current = e.target.value}  placeholder="Your Name" required/>
        <input type="email"  onChange={(e) => Email.current = e.target.value} placeholder="E-mail" required />
        <input type="password"  onChange={(e) => Password.current = e.target.value} placeholder="Password" required/>
        <input type="password"  onChange={(e) => rePassword.current = e.target.value} placeholder="re-Password" required/>
        {!signingUp && <input type={"submit"} value = {"SignUp"} className="btn"/>}
        {signingUp && <input type={"submit"} value = {"Signingup ..."} className="btn"/>}
      </form>
        </>
    );
}

export default SignupComp