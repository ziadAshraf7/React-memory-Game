import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { getAuth , createUserWithEmailAndPassword } from '@firebase/auth';
import {doc , setDoc } from "firebase/firestore"


  const HomePage = () => {
    let navigate = useNavigate();
  



      return ( 
          <>
        <div className='CoverPic'><img src={require("./img/b7ffa7fc9c4ceafa0013dfa3f803bcc8.jpg").default}/></div>
        
        <div className = "Home-wrapper">
          <div className='header'>
  <p>Memory Game</p>
</div>
    
      
      <div className = "buttons">
        <button  onClick = {() =>navigate("../signup") } className = "signlogin">SignUp/Login</button>
      

      </div>
        </div>

     
      
          </>
       );
  }
   
  export default HomePage;