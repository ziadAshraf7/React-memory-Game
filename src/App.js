import React, {  useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import {getFirestore, collection , getDoc ,setDoc , deleteDoc , doc, onSnapshot, getDocs} from "firebase/firestore"; 
import Game from './game';
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import HomePage from './Home';
import './App.css';
import SignUpLogin from './signupLogin';
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import Loading from './Loading';
import PageNotFound from './PageNotFound';




const firebaseConfig = {
  apiKey: "AIzaSyA4xmoT4YDGN6vZXzShTKj5FpWaPwF_dTQ",
  authDomain: "memory-game-4aa4e.firebaseapp.com",
  projectId: "memory-game-4aa4e",
  storageBucket: "memory-game-4aa4e.appspot.com",
  messagingSenderId: "356675683074",
  appId: "1:356675683074:web:dfae8d26d7665c450ef81b",
  measurementId: "G-5VT7R11KL7"
};
const FirebaseApp = initializeApp(firebaseConfig);

const Usersdb = getFirestore()

const Auth = getAuth(FirebaseApp)

const db = collection(Usersdb , "users")

export const Context = React.createContext()


function App() {
  let [IsUserOnline , setIsUserOnline] = useState()
  let [userDataLoading , setuserDataLoading] = useState(true)
  let [ErrorFetchingData , setErrorFetchingData] = useState(false)
  let [RefreshUserData ,setRefreshUserData] = useState(0)
  let [CredStatus , setCredStatus] = useState(false)
  let [CredSignUpUser , setCredSignUpUser] = useState(false)
  let [SignUpWithEmailAndPassword , setSignUpWithEmailAndPassword] = useState(false)
  let UserHistoryData = useRef({})
  let UsersID = useRef([])
  let [Authenticated , setAuthenticated] = useState()
  const UserInfo = useRef({userName : "" , EmailAddress : "" , userId : "" , userHistoryData : []})
  let {userId} = UserInfo.current



  let RefreshUserDataFunc = () =>{
    setRefreshUserData(prev => prev + 1) // use for re-render to reload user data if there is an connection error
  }


  let setSignUpWithEmailAndPasswordFunc = () =>{
    setSignUpWithEmailAndPassword(true)
  }

  let CredStatusFunc = (status) =>{
    setCredStatus(true)
  }


  let AuthenticatedFunc = () =>{
    setAuthenticated(true)
  }

  let CredSignUpUserFunc = () =>{
    setCredSignUpUser(false)
  }

  useEffect(() =>{
    
  onAuthStateChanged(Auth , user =>{
    if(user){ // if user created or loged in
   console.log("user")

     const UserId = user.uid   // user Id
     const EmailAddress = user.email
     UserInfo.current.userId = UserId
     UserInfo.current.EmailAddress = EmailAddress

     setIsUserOnline(true)

    
      getDocs(db).then( // To get All users ID to check if user just created an account or old user
        (snapshot) =>{
          if(UsersID.current.length == 0){  
            snapshot.docs.forEach(item =>{
            UsersID.current.push(item.id)
          })}
        }
      ).then(
        (snapshot) =>{
          let UsersIDArray = [...UsersID.current] // All Users ID
          if(UsersIDArray.includes(UserId)){ // check if account is exist is not
            console.log("Authenticated")
            setAuthenticated(true)
            setuserDataLoading(true)
            getDoc(doc(Usersdb , "users" , user.uid)).then(
              (res) => {
                let UserData = res.data()
               setuserDataLoading(false)
               setErrorFetchingData(false)
               UserInfo.current.userHistoryData= [...UserData.history]
               UserInfo.current.userName= UserData.Name
             }
          ).catch(
           err =>  {
           console.log(err)
           setuserDataLoading(true)
           setErrorFetchingData(true)
           }
          ) 
          
          }else{
            setAuthenticated(false)
            if(SignUpWithEmailAndPassword === false){ // if it false then the user signup with credential
              setCredSignUpUser(true)
              console.log("Not Authenticated")
            }
          }
        }
      )

      }else{ // case of offline
        setIsUserOnline(false)
        setAuthenticated(null)
        setSignUpWithEmailAndPassword(false)
        setCredStatus(false)
        setCredSignUpUser(false)
        UserInfo.current.userId = null
        console.log("No user")
      } 
    })
},[RefreshUserData])



useEffect(() =>{
  if(userId){
  onSnapshot(doc(Usersdb , "users" , userId) , (Data) =>{
    console.log("snapshot")
    let NewData = Data.data()
    
    if(!UsersID.current.includes(userId) && Authenticated === false){
      UsersID.current.push(userId)
    }

    console.log(Authenticated)

   if(NewData){ 
    console.log(NewData)
    setAuthenticated(true)
    UserInfo.current.userName = NewData.Name
    UserInfo.current.userHistoryData = [...NewData.history]
    setuserDataLoading(false)
    setErrorFetchingData(false)
  }
  })}

},[userId])


useEffect(() =>{
  console.log(Authenticated)
},[Authenticated])

useEffect(() =>{
  let URLArray = window.location.href.split("/")
  let LastURLTag = URLArray[URLArray.length - 1]
  console.log(Authenticated )
  if(IsUserOnline === true && Authenticated === false && LastURLTag == "signup"){
  
    return
    
  }else if(IsUserOnline === true && Authenticated === true && LastURLTag !== "game"){
  
  return
  
}else if(IsUserOnline === true && Authenticated === false && LastURLTag !== "game"){
  
        signOut(Auth)
        setIsUserOnline(false)
        setAuthenticated(null)
        setSignUpWithEmailAndPassword(false)
        setCredStatus(false)
        setCredSignUpUser(false)
      
  }
},[Authenticated])




// useEffect(() =>{
//  console.log(window.location.href.includes("home")) 
//   let arr = window.location.href.split("/")
//   console.log(arr)
// })

  return (
    <>
    <Context.Provider value={{Usersdb , Auth , CredSignUpUserFunc , AuthenticatedFunc, CredStatusFunc , setSignUpWithEmailAndPasswordFunc , Authenticated , CredSignUpUser , UserHistoryData ,UserInfo,userDataLoading,RefreshUserDataFunc,ErrorFetchingData,Usersdb , IsUserOnline}}>

    <Router>
      <Routes>
     <Route path = "/" element={<Navigate to = {"../home"} />} />   


  {(Authenticated === null || Authenticated === false ) && CredStatus === false  && <Route  path="home" element={<HomePage  />}/>}
  {Authenticated === true && <Route  path="home" element={<Navigate to = {"../game"}  />}/>}
  {CredStatus == true  && <Route  path="home" element={<PageNotFound Auth = {Auth} CredStatus = {CredStatus}  IsUserOnline={IsUserOnline} />}/>}
  <Route  path = "/home" element={<Loading />} />


  {Authenticated === true && 
  <Route  path = "game" element={<Game  props = {{Auth,IsUserOnline , CredStatusFunc}}  />}/>}
  {IsUserOnline === false && <Route  path="game" element={<Navigate  to={"../home"} />}/>}
  <Route  path = "game" element={<Loading Auth = {Auth} Authenticated = {Authenticated} />} />
  


  {(Authenticated === null || Authenticated === false ) &&  <Route  path = "signup" element = {<SignUpLogin    Usersdb = {Usersdb} Auth = {Auth} />}/>}
  {CredStatus && <Route  path="signup" element={<SignUpLogin    Usersdb = {Usersdb} Auth = {Auth} />}/>}
  {Authenticated && <Route path='signup' element={<Navigate  to={"../game"} />}/>}
  <Route  path = "signup" element={<Loading />} />





  <Route path='*'  element={<PageNotFound Authenticated={Authenticated} CredStatus={CredStatus} Auth={Auth} />}/>


   </Routes>
  </Router>
  </Context.Provider>
</>
 
  )
}

export default App;
