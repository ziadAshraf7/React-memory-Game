import { Box } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { gameStartDelay } from '../game_helper/GameHelper'
import { gameBlockComponentProps } from '../Types/types'




function Block({
    img ,
    flippCard ,
    isFilipped  , 
    isMatched ,
    block ,
    turnNumber ,
    difficulty
}:gameBlockComponentProps){

    let [initailFlipp , setInitialFlipp] = useState(false) 

    useEffect(() =>{
        setTimeout(() => {
            setInitialFlipp(true)
        }, 1000);
        setTimeout(() => {
            setInitialFlipp(false)
        }, gameStartDelay[difficulty]);
    },[turnNumber])

    return (
        <Box 
          pos = {"relative"} 
          h = "full" 
          w = "full">
                <Box  
                pos={"absolute"} 
                h = "full" 
                w = "full"
                sx = {{
                    transition : "transform 0.8s" ,
                    transform :  (isFilipped || isMatched || initailFlipp) ? "rotateY(180deg)" : "" 
                }}
                >
                <Image h = "full" w = "full" objectFit={"cover"} src={require(`../imgs/${img}`)} alt='Dan Abramov' />
                </Box>
                <Box 
                sx = {{
                     backfaceVisibility : "hidden" , 
                     transition : "transform 0.8s" , 
                     transform : (isFilipped || isMatched || initailFlipp) ? "rotateY(180deg)" : ""
                        }}
                onClick={() => flippCard(block)}  
                pos={"absolute"} 
                h = "full" 
                w = "full">
                <Image h = "full" w = "full" objectFit={"cover"} src={require(`../imgs/front.jpg`)} alt='Dan Abramov' />
                </Box>
        </Box>
    )
}


export default Block