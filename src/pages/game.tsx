import {useEffect, useState } from "react"
import { cardsColsNumber, cardsDims, difficultyMatchedImgsNumber, gameImages, gameStartDelay, gameTips } from "../game_helper/GameHelper"
import useMemory from "../hooks/useMemory"
import { gameHeadBarHeight, gameBlocksGenerate, generateRandomArray } from "../utils/utils"
import { Container, Flex, IconButton, Link, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SimpleGrid, Spinner, Tooltip, useDisclosure } from '@chakra-ui/react'
import {GridItem } from '@chakra-ui/react'
import Timer from "../Components/timer"
import { Button } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import useLocalStorage from "../hooks/useLocalStorage"
import { auth, db } from "../firebase/config"
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore"
import { useAuthState } from 'react-firebase-hooks/auth';
import UserInfoModal from "../Components/user_Info"
import WinModal from "../Components/winModal"
import {gamePageProps } from "../Types/types"
import Block from "../Components/game block"





function Game({
    selectedDifficulty ,
    selectedBlocksCount ,
    authenticatedUser ,
}:gamePageProps){
   
    const [user, loading] = useAuthState(auth)

    let {difficulty , blocksCount} = useLocalStorage(selectedDifficulty , selectedBlocksCount)
    let [gameOver , setGameOver] = useState(false)
    let [gameStart , setGameStart] = useState(false)
    let [gameWin , setGameWin] = useState(false)
    let [timerStart , setTimerStart] = useState(false)
    let [turnNumber , setTurnNumber] = useState(1)
    let [blocks] = useState(() => gameBlocksGenerate(blocksCount , gameImages , difficulty))
    let [randomBlocks , setRandomBlocks] = useState(() => generateRandomArray(blocks))
    let [passedGameMins , setPassedGameMins] = useState<number>()
    let [passedGameSecs , setPassedGameSecs] = useState<number>()

    // user Info modal
    const { isOpen : isOpen1, onOpen : onOpen1, onClose : onClose1 } = useDisclosure()

    // win game modal
    const { isOpen : isOpen2, onOpen : onOpen2, onClose : onClose2 } = useDisclosure()


    let { 
        flippedCardsIds , 
        matchedBlocks ,
        setCanFlipp, 
        flippCard ,
        setWrongTries ,
        setMatchedBlocks,
        setFlippedCards,
        setFlippedCardsIds,
        wrongTries } = useMemory(difficulty)


    function storePassedGameData(){
        let userDataRef = doc(db , "users" , user?.uid as string)
            getDoc(userDataRef).then(snapshot =>{
                updateDoc(userDataRef , {
                    rounds : [...snapshot?.data()?.rounds , {
                        date : Timestamp.fromDate(new Date()) ,
                        difficulty : difficulty , 
                        gameBlocksNumber : blocksCount ,
                        wrongTries : wrongTries ,
                        passedGameTime : {seconds :passedGameSecs , minutes : passedGameMins }
                    }]
                })
            }).catch(err => console.log(err))
    }

   function handleStartGame(){
    setGameStart(true)
    setTimerStart(false)
    setTimeout(() => {
        setTimerStart(true)
        setCanFlipp(true)
    },gameStartDelay[difficulty])
   }


   function handleStartNewGame(){
    setGameStart(true)
    setWrongTries(0)
    setGameWin(false)
    setMatchedBlocks([])
    setFlippedCards([])
    setFlippedCardsIds([])
    setGameOver(false)
    setTimerStart(false)
    setTurnNumber(prev => prev + 1)
    setRandomBlocks(generateRandomArray(blocks))
    setTimeout(() => {
        setTimerStart(true)
        setCanFlipp(true)
    },gameStartDelay[difficulty])
   }

   useEffect(() =>{
    if(difficulty && blocksCount){
        if(matchedBlocks.length * (difficultyMatchedImgsNumber[difficulty]) == blocksCount){
            setGameWin(true)
            onOpen2()
        }
    }
   },[blocksCount,matchedBlocks,difficulty])

useEffect(() =>{
    if(gameWin && passedGameSecs !== undefined && passedGameMins !== undefined ){
        storePassedGameData()
    }
},[gameWin , passedGameSecs , passedGameMins])


if(loading){
    return (
        <Center w = {"100vw"} h = {"100vh"}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                />
        </Center>
    )
}
   if(authenticatedUser == false){
    return ( 
        <Center w = {"100vw"} h = {"100vh"}>
            <Button as = {Link} href = {"../register"} colorScheme={"teal"}>return to register page</Button>
        </Center>)
}

   if(!difficulty && !blocksCount){
    return (
    <Center w = {"100vw"} h = {"100vh"}>
        <Button as = {Link} href = {"../difficulty"} colorScheme={"teal"}>go to set difficulty level</Button>
    </Center>
    )
   }

    return (
        <>
            <UserInfoModal 
                isOpen = {isOpen1}
                onClose = {onClose1}
           />
           
            <WinModal
                 isOpen = {isOpen2}
                 onClose = {onClose2}
            />


        {/* head bar */}
        <Flex direction="column" w = "100vw" h = "100vh" bg = "#171923">

            <Flex h = {`${gameHeadBarHeight}px`} p={3} justifyContent={gameOver || gameWin || !gameStart ? "space-between" : "center"}>
            
                {(gameOver || gameWin || !gameStart) && <IconButton borderRadius={"full"} onClick={onOpen1} aria-label={""} >
                    <img src={require("../imgs/user (3).svg").default} />
                </IconButton>} 
 

               {(gameOver || gameWin || !gameStart) &&  
                <Popover>
                        <PopoverTrigger>
                        <IconButton borderRadius={"full"}  aria-label={""} >
                            <img src={require("../imgs/help-circle.svg").default} />
                        </IconButton>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader>Game tip!</PopoverHeader>
                            <PopoverBody>{gameTips[difficulty]}</PopoverBody>
                        </PopoverContent>
                    </Popover>}

                    {(gameOver || gameWin || !gameStart) &&
                        <IconButton as = {Link} href = {"../difficulty"} aria-label={""}>
                            <Tooltip w = {"full"} label='set difficulty level' fontSize='lg'>
                                <img src = {require("../imgs/bar-chart.svg").default} />
                            </Tooltip>
                        </IconButton>
                    }
           
                    <Timer
                        difficulty = {difficulty}
                        key = {turnNumber}
                        gameWin= {gameWin}
                        timerStart = {timerStart}
                        gameOver = {gameOver}
                        gameStart = {gameStart}
                        setGameOver = {setGameOver}
                        setPassedGameMins = {setPassedGameMins}
                        setPassedGameSecs = {setPassedGameSecs}
                    />

            </Flex>
        {/* head bar */}

      
      {/* game blocks */}
    <Center h = {"100%"} w = {"100%"}>

     <Container sx = {{perspective : 300  }} maxW={"fit-content"}>

       {(gameOver || gameWin) && <Button transform={`translateY(-${gameHeadBarHeight/2}px)`} onClick={handleStartNewGame} colorScheme={"pink"}>Start new Game</Button>}
       {!gameStart && <Button transform={`translateY(-${gameHeadBarHeight/2}px)`} onClick={handleStartGame} colorScheme={"pink"}>Start</Button>}
       
       
       {(!gameOver && gameStart && !gameWin) && 
        <SimpleGrid 
        sx = {{transform:`translateY(-${(gameHeadBarHeight / 2) - 20}px)`}}
        columns={cardsColsNumber[blocksCount]} 
        spacing={[3,6,7]}>
        {randomBlocks?.map(block =>{
           return <GridItem
                   key = {block.id}
                   w = {cardsDims[blocksCount]}
                   h = {cardsDims[blocksCount]}
           >
            <Block
            block = {block}
            turnNumber = {turnNumber}
            difficulty = {difficulty}
            img = {block.img}
            flippCard = {flippCard}
            isFilipped = {flippedCardsIds.includes(block.id)} 
            isMatched = {matchedBlocks.includes(block.matchNumber)}
            />
            </GridItem>
        })}
          </SimpleGrid>}
        </Container>
        </Center>
      {/* game blocks */}

        </Flex>
        </>
    )
}


export default Game