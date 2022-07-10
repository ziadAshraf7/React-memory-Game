import { useContext, useEffect } from "react"
import { Context } from "./App"
import UseCounterDown from "./useCounterDown"
import {  doc, setDoc} from "firebase/firestore"; 


const Gamedata = (props) =>{
    let {wrongTries , EndGameMassage , PassedGame , setModalAccsesFunc , RetryBtnAccsesFunc , PreventPlaying , PlayAccses , UserInfoCompAccsesFunc} = props.props
    let IsUserOnline = props.IsUserOnline
    let {CountDown  , CounterDownFunc , StopCounterDown , resetCounterDown ,CounterDownSecondsDefaultValue,CounterDownMinutesDefaultValue , CounterDownMinutes ,CounterDownSeconds } = UseCounterDown()
    let {UserInfo, Usersdb  ,userDataLoading} = useContext(Context)

    let {userName , EmailAddress , userId , userHistoryData} = {...UserInfo.current}

    let StoreLastGameResult = () =>{
        if(!userDataLoading){
            let passedGameTime = ""
            let passedMinutesTime = CounterDownMinutesDefaultValue - CounterDownMinutes.current
            let passedSecondsTime = CounterDownSecondsDefaultValue - CounterDownSeconds.current
            if(CounterDownMinutes > 0){
                passedGameTime = `${passedMinutesTime} minutes and ${passedSecondsTime} seconds`
            }else{
                passedGameTime = `${passedSecondsTime} Seconds`
            }

           
            EndGameMassage.current = `Congratulation , you have passed the game in ${passedGameTime} `


            let d = new Date()
            let hours = d.getHours()
            console.log(hours)
            let ampm = hours >= 12 ? "PM":"AM";
            hours = hours > 12 ?  hours - 12 : hours
            hours = hours == 0 ? hours = 12 : hours
            let minutes = d.getMinutes()
            minutes = minutes < 10 ? minutes = "0" + minutes : minutes
            let month = d.getMonth() + 1;
            let day = d.getUTCDate();
            const year = d.getFullYear();
             setDoc(doc(Usersdb ,"users" ,userId) , {
               Name : userName , 
               Email : EmailAddress, 
               history : [{
                 date : `${day}/${month}/${year} ${hours}:${minutes}${ampm}` ,
                 passedGameTime:passedGameTime , 
                 wrongtries : wrongTries
               }, ...userHistoryData]
             }).catch((err) => console.log(err))
        }
       
      } 
     
    useEffect(() =>{
     if(IsUserOnline == false){
         StopCounterDown() // stop the counter when unmounting
    }},[IsUserOnline])

    useEffect(() =>{
            if(CountDown == "TimeOut") {
                PreventPlaying()
                RetryBtnAccsesFunc()
                StopCounterDown()
                setModalAccsesFunc()
                EndGameMassage.current = "ooooops Time Out , try again"
            }
    },[CountDown])

    useEffect(() =>{
      if(PlayAccses)  {
          resetCounterDown()
          CounterDownFunc()
        }
    },[PlayAccses])

    useEffect(() =>{
        if(PassedGame){
            StopCounterDown()
            StoreLastGameResult()
            setModalAccsesFunc()
        }
    },[PassedGame])


    return (
        <>
        
        <div className="Game-data">
        <div className="Game-data-bar">
            <div className="timer-data">
                <span>Count Down : </span>
                  <span  style={CounterDownMinutes.current == 0 && CounterDownSeconds.current < 10 ? {color : "red" , fontSize : "20px"} : {color : "black"}}>{CountDown}</span>
            </div>
            <div className="wrong-tries">wrong Tries:{wrongTries}</div>
        </div>

     <div className="GameBTNWrapper">
         <button className="GameBTN" onClick={UserInfoCompAccsesFunc}>Last Results</button>
     </div>
</div>
        </>
    )


}


export default Gamedata