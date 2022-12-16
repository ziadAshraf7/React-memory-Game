export const gameHeadBarHeight = 60


function matchNumberCheck(matchNumbersArray : number[] , newMatchNumber : number):boolean{
    return matchNumbersArray.includes(newMatchNumber)
}


export const difficultyImgsNumber : {[p : string] : number} = {
    easy : 2 ,
    hard : 3 ,
    pro : 4
}

export const generateCards = (cardsNumber : number , imgsArray : string[] , difficulty : string) =>{

    if(!cardsNumber && !difficulty){
        return
    }

    let cardsDataArray : {
        img : string ,
        matchNumber : number , 
        id : number
     }[] = []

    let matchNumbersArray : number[] = []

    let cardId = 0
    
      Array.from(new Array(cardsNumber / (difficultyImgsNumber[difficulty])),() =>{
        let randomIndex = Math.floor(Math.random() * imgsArray.length)
        let matchNumber = Math.floor(Math.random() * 100)
        let randomImg = imgsArray[randomIndex]
        imgsArray.splice(randomIndex , 1)
        
        if(matchNumberCheck(matchNumbersArray , matchNumber)){
            matchNumber = Math.floor(Math.random() * 100)
            matchNumberCheck(matchNumbersArray , matchNumber)
        }else{
            matchNumbersArray.push(matchNumber) 
        }

        Array.from(new Array(difficultyImgsNumber[difficulty]),() =>{
            cardId += 1
            cardsDataArray.push({
                img : randomImg , 
                matchNumber : matchNumber , 
                id : cardId
            })
        })
    })

 return cardsDataArray
}

export const generateRandomArray = (array : any[] | undefined) =>{
    if(!array){
        return
    }
    return [...array].sort(() => Math.random() - 0.5)
}



