


export type difficultyType = "easy" | "hard" | "pro" | ""


export type HomePageProps = {
    authenticatedUser : boolean  | undefined 
 }



 export type CardsNumberPageProps = {
    selectedDifficulty : difficultyType,
    setCardsNumber: React.Dispatch<React.SetStateAction<number>>,
    selectedCardsNumber : number | undefined ,
    authenticatedUser : boolean  | undefined 
}


export type difficultyPageProps = {
    selectedDifficulty :difficultyType,
    setDifficulty: React.Dispatch<React.SetStateAction<difficultyType>> ,
    authenticatedUser : boolean  | undefined 
}


export type gamePageProps = {
    selectedDifficulty : difficultyType,
    selectedCardsNumber : number , 
    authenticatedUser : boolean | undefined 
}


export type modalPropsType = {
    isOpen : boolean
    onClose : () => void
}
