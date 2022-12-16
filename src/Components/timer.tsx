import { Box } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Flex, Spacer } from '@chakra-ui/react'
import { difficultyGameMins } from '../game_helper/GameHelper'
import { Text } from '@chakra-ui/react'
type props = {
    setGameOver: React.Dispatch<React.SetStateAction<boolean>> ,
    gameOver : boolean ,
    timerStart : boolean ,
    gameWin : boolean ,
    setPassedGameMins : React.Dispatch<React.SetStateAction<number | undefined>>
    setPassedGameSecs : React.Dispatch<React.SetStateAction<number | undefined >> , 
    difficulty : "easy" | "hard" | "pro" | "" ,
    gameStart : boolean
}


function Timer({
    setGameOver ,
    gameOver ,
    timerStart,
    gameWin ,
    setPassedGameMins ,
    setPassedGameSecs ,
    difficulty ,
    gameStart
}:props){

    let [seconds , setSeconds] = useState<number>(0)
    let [minutes , setMinutes] = useState<number>(difficultyGameMins[difficulty])

    function handleSeconds(seconds : number):number{
        if(seconds == 0){
            setMinutes(minutes - 1) 
            return 59
        }
        return seconds - 1
    }

    useEffect(() =>{
        if(seconds == 0 && minutes == 0){
            setGameOver(true)
            return
        }


        if(gameWin){
            setPassedGameMins((difficultyGameMins[difficulty] - minutes) - 1)
            setPassedGameSecs(60 - seconds)
            return
        }

       let interval = setInterval(() =>{
        if(timerStart && !gameWin){
            setSeconds(prev => handleSeconds(prev))
        }
        },1000)

        return () => {
            clearInterval(interval)
        }

    },[seconds,timerStart,gameWin , minutes])
    return (
        <>
               {(!gameOver && !gameWin && gameStart) && 
               <Box >
                {<Text 
                fontFamily={'Pacifico'} 
                as = {"i"} 
                fontSize={ minutes == 0 ? "3xl" : "2xl"} 
                color={minutes == 0 ?  "#f50057" : "#EBF8FF"}
                >
                    {minutes + ":" + (seconds < 10 ? `0${seconds}` : seconds)} </Text>
                    }
                </Box>
                }
        </>
    )
}

export default Timer