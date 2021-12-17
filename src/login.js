import {Form} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from "react"
import {Button} from "react-bootstrap"
import { setDoc , doc } from "@firebase/firestore"
import {getAuth , signInWithEmailAndPassword } from "firebase/auth"
import { onAuthStateChanged } from '@firebase/auth';
import { useEffect } from "react";
const Login = (props) => {

  const Auth = getAuth()
  let navigate = useNavigate()
  let EmailRef = useRef()
  let PasswordRef = useRef()
  let [Autherror , setautherror] = useState(false)
  let [pageaccses , setpageaccses] = useState(true)
  let [loading , setloading] = useState(false)

  useEffect(() =>{
    onAuthStateChanged(Auth , (user) =>{
      if(user){
        setpageaccses(false)
      }
    })

    return () => setpageaccses(false)
} , [])



  let UserLogin = (e , email , password) =>{
    setloading(true)
    e.preventDefault()
    if(email != "" &&  password != ""){
      signInWithEmailAndPassword(Auth , email , password).then(
        (res) => {
          setautherror(false)
          navigate("/game")
        }
      ).catch(
        (err) => {setautherror(true)
          setloading(false)
        }
      )
      email = ""
      password = ""
    }
  }


    return ( 
      <>
      {pageaccses && 
    <div className="form login">
        <div className = "img">
            <img src = {require("./img/2488408.jpg").default}></img>
        </div>
        {Autherror && <div className = "alert">
          the Email and password are incorrect
          </div>}
        <div className = "form-style">
        <Form onSubmit = {(e) => UserLogin(e ,EmailRef.current.value , PasswordRef.current.value )}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control ref = {EmailRef} type="email" placeholder="Enter email"  required/>
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control ref = {PasswordRef} type="password" placeholder="Password" required/>
</Form.Group>

  {!loading && <Button variant="primary" type="submit">
  Login
  </Button>}
  {loading && <button className="btn btn-primary" >
  loging in ...
  </button>}
</Form>
        </div>
    </div>
}
    </>
     );
}
 
export default Login;