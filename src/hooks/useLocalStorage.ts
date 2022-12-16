import {useState } from "react"
import {difficultyType } from "../Types/types"


function useLocalStorage(selectedDifficulty : difficultyType,selectedBlocksCount : number){
    let [difficulty] = useState(() =>{
        if(selectedDifficulty){
            localStorage.difficulty = selectedDifficulty
            return selectedDifficulty
        }else{
            return localStorage.difficulty
        }
    })
    let [blocksCount] = useState(() =>{
        if(selectedBlocksCount){
            localStorage.blocksCount = selectedBlocksCount
            return selectedBlocksCount
        }else{
            return  localStorage.blocksCount
        }
    })


   return {difficulty , blocksCount}
}


export default useLocalStorage




