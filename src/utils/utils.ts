import { difficultyMatchedImgsNumber } from "../game_helper/GameHelper"
import { difficultyType, gameBlockType } from "../Types/types"

export const gameHeadBarHeight = 60


export function gameBlocksGenerate(cardsNumber : number , imgsArray : string[] , difficulty : difficultyType){
    if(!difficulty || !cardsNumber) return
    let blocksData : gameBlockType[] = []
    let mathcNumberArray : number[] = []
    let blocksImgsArray : string[]= []
    let blockId = 0
    
    while(blocksData.length < cardsNumber){
        let randomImg =  blockImgCheck(blocksImgsArray , imgsArray) 
        blocksImgsArray.push(randomImg)
        let randomMatchNumber = matchNumberCheck(mathcNumberArray)
        mathcNumberArray.push(randomMatchNumber)

        new Array(difficultyMatchedImgsNumber[difficulty]).fill(null).forEach(() =>{
            blockId++
            blocksData.push({img : randomImg , matchNumber : randomMatchNumber , id : blockId })
        })

    }
    return blocksData
}

function blockImgCheck(blocksImgsArray: any,imgsArray: string | any[]):string{
    let randomImg = imgsArray[Math.floor(Math.random() * imgsArray.length)]
    return blocksImgsArray.includes(randomImg) ? blockImgCheck(blocksImgsArray , imgsArray) : randomImg 
}

function matchNumberCheck(matchNumbersArray : number[]) : number {
    let mathcNumber = Math.floor(Math.random() * 10000)
    return matchNumbersArray.includes(mathcNumber) ? matchNumberCheck(matchNumbersArray) : mathcNumber 
}


export const generateRandomArray = (array : any[] | undefined) =>{
    if(!array){
        return
    }
    return [...array].sort(() => Math.random() - 0.5)
}



