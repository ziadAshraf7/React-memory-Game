import { useEffect, useState } from "react"
import { difficultyMatchedImgsNumber } from "../game_helper/GameHelper"
import { difficultyType, gameBlockType } from "../Types/types"



function useMemory(difficulty : difficultyType){

    let [flippedCards , setFlippedCards] = useState<any[]>([])
    let [flippedCardsIds , setFlippedCardsIds] = useState<number[]>([])
    let [matchedBlocks , setMatchedBlocks] = useState<number[]>([])
    let [canFlipp , setCanFlipp] = useState(false)
    let [wrongTries , setWrongTries] = useState(0)
    
    function flippCard(block : gameBlockType){
        if(canFlipp){
            setFlippedCardsIds(prev => [...prev , block.id])
            setFlippedCards(prev => [...prev , block])
        }
    }

   

    useEffect(() =>{
        if(flippedCards.length == 2 || flippedCards.length == 3 || flippedCards.length == 4){
            let flippedMatchNumber = flippedCards[0].matchNumber
            let isCardsMatched = flippedCards.every(card => card.matchNumber == flippedMatchNumber)

            if(!isCardsMatched){
                setCanFlipp(false)
                setTimeout(() => {
                    setFlippedCards([])
                    setFlippedCardsIds([])
                    setCanFlipp(true)
                    setWrongTries(prev => prev + 1)
                }, 800);
            }


            if(isCardsMatched && flippedCards.length == (difficultyMatchedImgsNumber[difficulty])){
                setMatchedBlocks(prev => [...prev , flippedMatchNumber])
                setFlippedCards([])
                setFlippedCardsIds([])
            }

        }
    },[flippedCards , flippedCardsIds])

    return {setFlippedCards ,setWrongTries ,setFlippedCardsIds ,setMatchedBlocks ,wrongTries , setCanFlipp , flippedCards , matchedBlocks , flippCard , flippedCardsIds}
}


export default useMemory