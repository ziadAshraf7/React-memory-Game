import { useEffect, useLayoutEffect, useRef, useState } from "react"


const UseMemory = (GameCarts) =>{
  let GameCartsMatcheNumbers = useRef([])
  let clickedCarts = useRef([])
  let [matchedCarts , setmatchedCarts] = useState([])
  let [wrongTries , setwrongTries] = useState(0)
  let [PassedGame , setPassedGame] = useState(false)
  let [PlayAccses , setPlayAccses] = useState(false)
  let [startGameBtnAccses , setstartGameBtnAccses] = useState(true)
  let [RetryGameBtnAccses , setRetryGameBtnAccses] = useState(false)
  let [GameRounds , setGameRounds] = useState(0)
  let [RandomIndexes , setRandomIndexes] = useState([])
 


  useEffect(() =>{
    GameCarts.forEach((item , index) => {
      if(index + 1 > GameCarts.length){
        return false
      }
      GameCartsMatcheNumbers.current.push(item.mathcNumber)
    });
  },[])

  // useEffect(() =>{
  //   CreateRandomIndexes()
  // },[])


  let CreateRandomIndexes = () =>{
    let arr = []
    while(arr.length < GameCarts.length){
      let RandomIndexNumber = Math.floor(Math.random() * GameCarts.length )
      if(!arr.includes(RandomIndexNumber)){
        arr.push(RandomIndexNumber)
      }
    }
    setRandomIndexes([...arr])
  }


const ClickHandler = (index) =>{


      clickedCarts.current = [...clickedCarts.current ,index ]

      if( clickedCarts.current.length == 2){
        let FirstItemIndex = clickedCarts.current[0]
        let SecondItemIndex = clickedCarts.current[1]

        let FirstItemMatcheNumber = GameCarts[FirstItemIndex].mathcNumber
        let SecondItemMatchNumber = GameCarts[SecondItemIndex].mathcNumber

          if(FirstItemMatcheNumber == SecondItemMatchNumber){
            setmatchedCarts(prev => [...prev , FirstItemMatcheNumber])
          }else{
            setTimeout(() => {
              setwrongTries(prev => prev + 1)
              setmatchedCarts(prev => [...prev])
            }, 800);
          }
  
      
    
  }

  }
 
  useEffect(() =>{
    clickedCarts.current = []
   if(matchedCarts.length == GameCarts.length / 2){
    setPassedGame(true)
    setPlayAccses(false)
   }
  },[matchedCarts])




  useEffect(() =>{
    if(PassedGame){
      RetryBtnAccsesFunc()
    }
  },[PassedGame])  



  let PreventPlaying = () =>{
    setPlayAccses(false)
  }

  let RetryBtnAccsesFunc = () =>{
    setRetryGameBtnAccses(true)
  }

  let PlayAccsesFunc = (status) =>{
    setPlayAccses(status)
  }

  let startGameBtnAccsesFunc = (status) =>{
    setstartGameBtnAccses(status)
  }

  let StartPlaying =  () =>{
    CreateRandomIndexes()
    setRetryGameBtnAccses(false)
    setmatchedCarts([])
    startGameBtnAccsesFunc(false)
    setGameRounds(prev => prev + 1)
  }

  useEffect(() =>{ 
    let accses = true
    if(GameRounds > 0){
      setTimeout(() => {
        if(accses)
        setmatchedCarts(GameCartsMatcheNumbers.current)
        console.log("f")
      }, 1000)
      setTimeout(() => {
        if(accses){
          setPassedGame(false)
          PlayAccsesFunc(true)
          setmatchedCarts([])
          setwrongTries(0)
        }
      }, 2500);
    }

    return () => accses = false

  },[GameRounds])


return {ClickHandler  ,  RandomIndexes , PlayAccsesFunc ,CreateRandomIndexes ,startGameBtnAccsesFunc, matchedCarts , RetryBtnAccsesFunc , clickedCarts , StartPlaying , RetryGameBtnAccses , PreventPlaying,startGameBtnAccses ,  PlayAccses , wrongTries , PassedGame}

}


export default UseMemory