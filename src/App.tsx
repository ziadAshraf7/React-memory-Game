
import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import CardsNumber from './pages/cardsNumber';
import Difficulty from './pages/difficulty';
import Game from './pages/game';
import { useEffect, useState } from 'react';
import Register from './pages/register';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { difficultyType } from './Types/types';


function App() {

  let [selectedDifficulty , setDifficulty] = useState<difficultyType>("")
  let [selectedBlocksCount , setBlocksCount] = useState<number>(0)
  let [authenticatedUser , setAuthenticatedUser] = useState<boolean | undefined>(undefined)


  useEffect(() =>{
    onAuthStateChanged(auth , (user) =>{
      if(!user){
        setAuthenticatedUser(false)
        return
      }
      let userDataRef = doc(db , "users" , user.uid)
      onSnapshot(userDataRef , (snapShot =>{
        let userData = snapShot.data()
        if(userData){
          setAuthenticatedUser(true)
        }else{
          setAuthenticatedUser(false)
        }
      }))
    })
  },[])


    return (
      <>
       <Routes>
            <Route path='/' element = {<Home authenticatedUser = {authenticatedUser} />} />
            
            <Route path='/cardsNumber' element = {<CardsNumber 
              selectedBlocksCount = {selectedBlocksCount} 
              selectedDifficulty = {selectedDifficulty} 
              setBlocksCount = {setBlocksCount} 
              authenticatedUser = {authenticatedUser}
            />} />
          
            <Route path='/difficulty' element = {<Difficulty 
              selectedDifficulty = {selectedDifficulty} 
              setDifficulty = {setDifficulty} 
              authenticatedUser = {authenticatedUser}
            />} />
            

            <Route path='/game' element = {
                <Game 
                selectedDifficulty = {selectedDifficulty} 
                selectedBlocksCount = {selectedBlocksCount} 
                authenticatedUser = {authenticatedUser}
                />
            } />

            
            <Route path='/register' element = {<Register authenticatedUser = {authenticatedUser}  />} />
       </Routes>
      </>
    )
  }





export default App
