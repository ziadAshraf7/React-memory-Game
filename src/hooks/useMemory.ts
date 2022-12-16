import { useEffect, useState } from "react"
import { difficultyType } from "../Types/types"
import { difficultyImgsNumber } from "../utils/utils"



function useMemory(difficulty : difficultyType){

    let [flippedCards , setFlippedCards] = useState<any[]>([])
    let [flippedCardsIds , setFlippedCardsIds] = useState<number[]>([])
    let [matchedCards , setMatchedCards] = useState<number[]>([])
    let [canFlipp , setCanFlipp] = useState(false)
    let [wrongTries , setWrongTries] = useState(0)
    
    function flippCard(card : any){
        if(canFlipp){
            setFlippedCardsIds(prev => [...prev , card.id])
            setFlippedCards(prev => [...prev , card])
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


            if(isCardsMatched && flippedCards.length == (difficultyImgsNumber[difficulty])){
                setMatchedCards(prev => [...prev , flippedMatchNumber])
                setFlippedCards([])
                setFlippedCardsIds([])
            }

        }
    },[flippedCards , flippedCardsIds])

    return {setFlippedCards ,setWrongTries ,setFlippedCardsIds ,setMatchedCards ,wrongTries , setCanFlipp , flippedCards , matchedCards , flippCard , flippedCardsIds}
}


export default useMemory