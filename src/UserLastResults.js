import { useContext } from "react"
import { Context } from "./App"


let UserLastResults = (props) =>{

    let {LogingOutFunc , UserInfoCompAccses} = props.props 
    
    let { UserInfo , IsUserOnline , userDataLoading , RefreshUserDataFunc ,  ErrorFetchingData } = useContext(Context)

    let {userName,userHistoryData} = UserInfo.current

    if(userDataLoading){
        if(ErrorFetchingData){
            return  <div style={UserInfoCompAccses ? {transform : "translateY(0)"} : {transform : "translateY(-102%)"}} className="User-Container-data">
                {IsUserOnline == true && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>LogOut</button></div>}
                {IsUserOnline == false && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>Loging out...</button></div>}
            <div style={{ width : "100%", height : "100%" , rowGap : "10px" ,display : "flex" , flexDirection : "column" , justifyContent : "center" , alignItems : "center"}}>
           <div>The data Failed To Load please check your connection and click the button below</div>
            <div style = {{fontSize : "10px" , color : "rgb(88 77 77)"}}>The weak connection will prevent your passed game result to be stored in your history plays</div>
            <button onClick={RefreshUserDataFunc}>Reload</button>
            </div>
            </div>
        }
      return  <div style={UserInfoCompAccses ? {transform : "translateY(0)"} : {transform : "translateY(-102%)"}} className="User-Container-data">
        {IsUserOnline == true && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>LogOut</button></div>}
        {IsUserOnline == false && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>Loging out...</button></div>}
         <div style={{ width : "100%", height : "100%" , display : "flex" , justifyContent : "center" , alignItems : "center"}}>Data is Fetching...</div>
         </div>
         
    }else if(userHistoryData.length == 0){
      return  <div style={UserInfoCompAccses ? {transform : "translateY(0)"} : {transform : "translateY(-102%)"}} className="User-Container-data">
        {IsUserOnline == true && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>LogOut</button></div>}
        {IsUserOnline == false && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>Loging out...</button></div>}
                            <div className="Userdata">
                                <div className="User-icon"><img  src = {require("./img/account.png").default}/></div>
                                <div className="User-name">{userName}</div>
                            </div>
                            <div  style={{width : "100%" , height : "50%" , display : "flex" , justifyContent : "center" }}>
                                <div style={{fobtSize : "15px"}}>You don't win a game yet to show your Last results</div>
                            </div>
                            </div>
    }
    else{
        return <>
        <div style={UserInfoCompAccses ? {transform : "translateY(0)"} : {transform : "translateY(-102%)"}} className="User-Container-data">
{IsUserOnline == true && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut" onClick={LogingOutFunc}>LogOut</button></div>}
{IsUserOnline == false && <div style={{position : "absolute" , left : 0 , top : 0 }}>  <button className="LogOut">Loging out...</button></div>}
                    <div className="Userdata">
                        <div className="User-icon"><img  src = {require("./img/account.png").default}/></div>
                        <div className="User-name">{userName}</div>
                    </div>
                    <div  style={{overflowY : "scroll" , width : "100%" , height : "50%"}}>
            <div className="Table-header"  style={{width : "100%" , padding : "20px" , display : "grid" , gridTemplateColumns : "repeat(3,1fr)" , placeItems : "center" }}>
            <div >
           <div>Date</div> 
               </div>
               <div >
                   Wrong-tries
               </div>
               <div >
                  Time
               </div>
                   </div>
                    {userHistoryData.map((item , index) =>{
                 return <div className="lastResults" key = {index} style={{width : "100%" , padding : "20px" , display : "grid" , gridTemplateColumns : "repeat(3,1fr)" , placeItems : "center"}}>
            
                     <div>
                    <div>{item.date}</div> 
                        </div>
                        <div >
                            {item.wrongtries}
                        </div>
                        <div >
                            {item.passedGameTime}
                        </div>
                            </div>
                            
                        })}
        </div>  
   </div>
        </>
    }
      
 
       
    
}


export default UserLastResults