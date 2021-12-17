import React, { useEffect, useRef, useState } from "react"
import { useContext } from "react"
import {Form} from "react-bootstrap"
import { setDoc , doc } from "@firebase/firestore"
import {getAuth , createUserWithEmailAndPassword } from "firebase/auth"
import {Button , Alert} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';

const SignUp =(props) =>  {

  let [passwordError , setpasswordError] = useState(false)
  

  let {db,Ref} = props.props
  
  const Auth = getAuth()
  let navigate = useNavigate();
  let EmailRef = useRef()
  let NameRef = useRef()
  let PasswordRef = useRef()
  let rePasswordRef = useRef()
  let formwrapperRef = useRef() 
  let alertRef = useRef()
  let [pageaccses , setpageaccses] = useState(true)


  useEffect(() =>{
    onAuthStateChanged(Auth , (user) =>{
        if(user){
          setpageaccses(false)
    
        }else{
          setpageaccses(true)
        }
      })
} , [Auth])




  let signNewUser = (e ,email , name , password , repassword) =>{
    e.preventDefault()
    if(email != "" && name != "" && password != "" && repassword != ""  ){

      if(password == repassword){
        setpasswordError(false)
        
        createUserWithEmailAndPassword(Auth , email , password).then(
          (res) => {
            alert("Email has been created")
            let UserId = res.user.uid
            let userObject = doc(db , "users" ,UserId)
            setDoc(userObject , {
              Email : res.user.email , 
              Name : name , 
              history : []   
            })
            email = ""
            name = ""
            password = ""
            repassword = ""
            navigate("/game")
           }
        ).catch(
          (err) => console.log(err)
        )
      }else{
        setpasswordError(true)
      }



    }else{
      return false
    }


  }


 
// style ={{top:`${formwrapperRef.current.style.top - 10}px`}}
    return ( 
  
      <>
      {pageaccses && 
        <div className = "form">
        <div   className = "img">
            <img src = {require("./img/2488408.jpg").default}></img>
        </div>
        {passwordError && <div   className = "alert">
          the password field should equal to repassword field
          </div>}
        <div  ref={formwrapperRef} className="form-style">
        <Form onSubmit = {(e) => signNewUser(e , EmailRef.current.value , NameRef.current.value , PasswordRef.current.value ,rePasswordRef.current.value )}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label >Email address</Form.Label>
    <Form.Control ref = {EmailRef} size = "sm" type="email" placeholder="Enter email" required />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Full Name</Form.Label>
    <Form.Control ref = {NameRef} size = "sm" type="text" placeholder="Enter name"  required/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control ref = {PasswordRef} size = "sm" type="password" placeholder="Password"  required/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>re-password</Form.Label>
    <Form.Control ref = {rePasswordRef} size = "sm" type="password" placeholder="Password" required />
  </Form.Group>

  <Button variant="primary" type="submit" >
    SignUp
  </Button>
</Form>
        </div>
        </div>
}
        </>
     );
}
 
export default SignUp;