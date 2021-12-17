import React, { useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc } from "firebase/firestore"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './game';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './Home';
import './App.css';
import SignUp from './signup';
import Login from './login';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA4xmoT4YDGN6vZXzShTKj5FpWaPwF_dTQ",
  authDomain: "memory-game-4aa4e.firebaseapp.com",
  projectId: "memory-game-4aa4e",
  storageBucket: "memory-game-4aa4e.appspot.com",
  messagingSenderId: "356675683074",
  appId: "1:356675683074:web:dfae8d26d7665c450ef81b",
  measurementId: "G-5VT7R11KL7"
};


function App() {
  

  const app = initializeApp(firebaseConfig);

  
  const db = getFirestore();
  
  const Ref = collection(db , "users")
  
  const Auth = getAuth()




  return (
    <>
    <Router>
      <Routes>
 
   <Route  path = "/game" element = {<Game props = {db} />}/>

   <Route  path = "/signup" element = {
   <SignUp props = {{db,Ref}} />
   }/>

   <Route  path = "/login" element = {<Login props = {{db,Ref}} />}/>
   <Route exact path = "/" element = {<HomePage  />}/>
   


   </Routes>
  </Router>
</>
 
  );
}

export default App;
