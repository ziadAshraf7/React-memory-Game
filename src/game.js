import { useState  ,React, useRef, useEffect} from "react";
import { signOut} from '@firebase/auth';
import GameCart from "./GameCart";
import Gamedata from "./Gamedata";
import UserLastResults from "./UserLastResults";
import UseMemory from './useMemory';
import  Modal  from "./Modal";

const GameCarts = [{
  back : "./img/—Pngtree—cartoon bee clipart_4160541.png" , 
  style : {transform:"rotateY(0)" } , 
  mathcNumber : 1 , 
  matched : false ,
  id : 1
} , {
  back : "./img/—Pngtree—cartoon bee clipart_4160541.png" , 
  style:{transform:"rotateY(0)" } , 
  mathcNumber : 1 , 
  matched : false ,
  id : 2
} ,
{
  back : "./img/angular-14a0f6532f.png" , 
  style:{transform:"rotateY(0)" } , 
  mathcNumber : 2 , 
  matched : false ,
  id : 3
}
,{
back : "./img/angular-14a0f6532f.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 2 , 
matched : false ,
id : 4
},{
back : "./img/—Pngtree—2022 poster_6681272.png" , 
style:{transform:"rotateY(0)"} , 
mathcNumber : 3 , 
matched : false ,
id : 5
},
{
back : "./img/—Pngtree—2022 poster_6681272.png" , 
style:{transform:"rotateY(0)"} , 
mathcNumber : 3 , 
matched : false ,
id : 6
},
{
back : "./img/2cd43b_b13c89d3859a48129a434265b3ddd1a1_mv2_d_1826_1920_s_2.png" , 
style:{transform:"rotateY(0)"} , 
mathcNumber : 4 , 
matched : false ,
id : 7
},
{
back : "./img/2cd43b_b13c89d3859a48129a434265b3ddd1a1_mv2_d_1826_1920_s_2.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 4 , 
matched : false ,
id : 8
},
{
back : "./img/1200px-Vue.js_Logo_2.svg.webp" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 5 , 
matched : false ,
id : 9
},
{
back : "./img/1200px-Vue.js_Logo_2.svg.webp" , 
style:{transform:"rotateY(0)"} , 
mathcNumber : 5 , 
matched : false ,
id : 10
},
{
back : "./img/images.jpg" , 
style:{transform:"rotateY(0)"} , 
mathcNumber : 6 , 
matched : false ,
id : 11
},
{
back : "./img/images.jpg" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 6 , 
matched : false ,
id : 12
},
{
back : "./img/images.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 7 , 
matched : false ,
id : 13
},
{
back : "./img/images.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 7 , 
matched : false ,
id : 14
},
{
back : "./img/download.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 8 , 
matched : false ,
id : 15
},
{
back : "./img/download.png" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 8 , 
matched : false ,
id : 16
},
{
back : "./img/shining-circle-purple-lighting-isolated-dark-background_1441-2396.webp" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 9 , 
matched : false ,
id : 17
},
{
back : "./img/shining-circle-purple-lighting-isolated-dark-background_1441-2396.webp" , 
style:{transform:"rotateY(0)" } , 
mathcNumber : 9 , 
matched : false ,
id : 18
},
{
back : "./img/—Pngtree—cartoon tree_230886.png" , 
mathcNumber : 10 , 
id : 19
},
{
back : "./img/—Pngtree—cartoon tree_230886.png" , 
mathcNumber : 10 , 
id : 20
}]



const Game = (props) => {
      let EmptyArray = [...Array(GameCarts.length)]
      let [UserInfoCompAccses , setUserInfoCompAccses] = useState(false)
      let [ModalAccses , setModalAccses] = useState(false)
      let EndGameMassage = useRef("")
      const FlibedCartStyle  = {transform : "rotateY(180deg)" ,  transition:"all 1s"}  
      const UnFlibedCartStyle = {transform : "rotateY(0)" , transition:"all 1s"}  
      let { Auth  } = props.props
      let {ClickHandler ,  matchedCarts  , RandomIndexes   , RetryBtnAccsesFunc, clickedCarts , StartPlaying , RetryGameBtnAccses , PreventPlaying,startGameBtnAccses ,  PlayAccses , wrongTries , PassedGame} = UseMemory(GameCarts)     


      
      
      const UserInfoCompAccsesFunc = () =>{
        setUserInfoCompAccses(!UserInfoCompAccses)
      }  
 
      const LogingOutFunc = () =>{
          signOut(Auth)
      }

      let setModalAccsesFunc = () =>{
        setModalAccses(!ModalAccses)
      } 


    return ( 
        <>

      <div className="CoverPic"><img src={require("./img/360_F_326319663_Qx09DAOKPIQYVP9jU0mBeDlPTBKhqR96.jpg").default} /></div>
     {startGameBtnAccses  &&  <div className="start-game">
            <button onClick={StartPlaying}>Start</button>
        </div>}

     <Modal props = {{setModalAccsesFunc , ModalAccses , EndGameMassage}} />


      <div className="Game">

       <UserLastResults props= {{LogingOutFunc , UserInfoCompAccses}}  />

     <div className="Game-Container">
      <div className="Retry-Round">
          <div className="Retry-Round-btn">
             {RetryGameBtnAccses &&  <button className="GameBTN" onClick={StartPlaying} >Retry</button>}
          </div>
          </div>   
     <div className="Blocks-Container">
      <div className="Blocks">
      
     {RandomIndexes.length > 0 && RandomIndexes.map((RandomNumber ) =>{
        return <GameCart  key={GameCarts[RandomNumber].id} CartImg={GameCarts[RandomNumber].back} styles={{FlibedCartStyle , UnFlibedCartStyle}} GameCarts={GameCarts} useMemory={{ClickHandler , matchedCarts , clickedCarts  ,PlayAccses}}  RandomNumber={RandomNumber}  matched = {GameCarts[RandomNumber].matched}  mathcNumber={GameCarts[RandomNumber].mathcNumber} />
    })}
        {RandomIndexes.length == 0 && EmptyArray.map((item , index) =>{
        return <div key={index} className="Cart-parent"><div className="Cart"></div></div>
    })}
         </div>   
         </div>
        <Gamedata props = {{wrongTries , EndGameMassage , setModalAccsesFunc , PassedGame , RetryBtnAccsesFunc , PreventPlaying , PlayAccses , UserInfoCompAccsesFunc}}    />
  </div>
  </div>


</>
    )
}
export default Game