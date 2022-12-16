import {useState } from "react"
import {difficultyType } from "../Types/types"


function useLocalStorage(selectedDifficulty : difficultyType,selectedCardsNumber : number){
    let [difficulty] = useState(() =>{
        if(selectedDifficulty){
            localStorage.difficulty = selectedDifficulty
            return selectedDifficulty
        }else{
            return localStorage.difficulty
        }
    })
    let [cardsNumber] = useState(() =>{
        if(selectedCardsNumber){
            localStorage.cardsNumber = selectedCardsNumber
            return selectedCardsNumber
        }else{
            return  localStorage.cardsNumber
        }
    })


   return {difficulty , cardsNumber}
}


export default useLocalStorage




