


export type difficultyType = "easy" | "hard" | "pro" | ""


export type HomePageProps = {
    authenticatedUser : boolean  | undefined 
 }



 export type CardsNumberPageProps = {
    selectedDifficulty : difficultyType,
    setBlocksCount: React.Dispatch<React.SetStateAction<number>>,
    selectedBlocksCount : number  ,
    authenticatedUser : boolean  | undefined 
}


export type difficultyPageProps = {
    selectedDifficulty :difficultyType,
    setDifficulty: React.Dispatch<React.SetStateAction<difficultyType>> ,
    authenticatedUser : boolean  | undefined 
}


export type gamePageProps = {
    selectedDifficulty : difficultyType,
    selectedBlocksCount : number , 
    authenticatedUser : boolean | undefined 
}


export type modalPropsType = {
    isOpen : boolean
    onClose : () => void
}


export type gameBlockType = {
    img : string , 
    matchNumber : number , 
    id : number
}

export type gameBlockComponentProps = {
    img : string ,
    flippCard : (block : gameBlockType) => void , 
    isFilipped : boolean , 
    isMatched : boolean ,
    block : gameBlockType ,
    turnNumber : number ,
    difficulty : difficultyType
}