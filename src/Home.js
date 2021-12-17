import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth } from '@firebase/auth';

 

  const HomePage = () => {
    let [pageaccses , setpageaccses] = useState(true)

    let navigate = useNavigate();
    const Auth = getAuth()

    useEffect(() =>{
      onAuthStateChanged(Auth , (user) =>{
        if(user){
          setpageaccses(false)
          navigate("/game")
    
        }
       
      })

     return () =>  setpageaccses(false)
    },[])
   
    

      return ( 
          <>

          {pageaccses &&
          <div className = "Home-wrapper">
        <div className = "img">
          <img src = {require("./img/2449640.jpg").default}></img>
        </div>
        
        <div className = "buttons">
          <button onClick = {() =>navigate("login") } className = "btn btn-primary">Login</button>
          <button onClick = {() =>navigate("signup") } className = "btn btn-primary">SignUp</button>
        </div>
          </div>
  }
         
          
          </>
       );
  }
   
  export default HomePage;