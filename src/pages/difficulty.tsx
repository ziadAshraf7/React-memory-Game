import { Box, Link, Spinner } from '@chakra-ui/react'
import { difficultyCardsNumber } from '../game_helper/GameHelper'
import { Center } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'
import { gameTypeSelectionVariant, selectionBtn, selectionItems } from './framer motion variants/variants'
import { Button} from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config'
import { useEffect, useState } from 'react'
import { difficultyPageProps } from '../Types/types'


function Difficulty({
    selectedDifficulty,
    setDifficulty ,
    authenticatedUser
}:difficultyPageProps){
    
    let difficulties = Object.keys(difficultyCardsNumber)
    let navigate = useNavigate()
    let [mockLoading , setMockLoading] = useState(true)
    const [user, loading] = useAuthState(auth)


    useEffect(()=>{
        setTimeout(() => {
            setMockLoading(false)
        }, 1000);
    },[])

    if(loading || mockLoading){
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

    return (
        <Box  w = "100vw"  h = "100vh" bg = "gray.900">
            <Center w = "full" h = "full" >
            <motion.div
              variants = {gameTypeSelectionVariant}
              initial = {"initial"}
              animate = {"visible"}
            >
            <Flex 
            minWidth={250}
             width={[300 , 400 , 500 , 750 , 900]}
             justifyContent={"space-around"} flexDirection={"column"} h = "full" w = "full" >
            <Heading fontFamily={"sans-serif"} mb = {2} letterSpacing={4} size = {["sm" , "md" , "xl"]} as='h1' color = "#EDF2F7"  noOfLines={1}>
                 Difficulty
            </Heading>
            <Box mb = {2}>
            {
                difficulties.map((item ) =>{
                    return (
                        <motion.div
                        key = {item}
                        variants={selectionItems}
                        whileHover = {"hover"}
                        onClick={() => setDifficulty(item as "hard")}
                        style={{
                            height : "50px" ,
                            color : selectedDifficulty == item ? "#EDF2F7" : "grey" ,
                            display : "flex" ,
                            padding : 10 ,
                            alignItems : "center",
                            backgroundColor : selectedDifficulty == item ? "RGBA(0, 0, 0, 0.16)" : "RGBA(0, 0, 0, 0.06)" ,
                            marginBottom : "10px" ,
                            cursor : "pointer" ,
                        }}
                      >{item}</motion.div>
                    )
                })
            }
                {selectedDifficulty &&
                            <motion.button
                            variants={selectionBtn}
                            initial = {"initial"}
                            animate = {"visible"}
                        >
                <Button variant='outline' bg = {"grey.900"} color={"#EDF2F7"} _hover = {{color : "#1A202C" , bg : "#EDF2F7" , transition : "ease 0.8s" }} h = {8} w = {100} 
                 onClick={() => navigate("../cardsNumber")}>
                    Next
                </Button>
                </motion.button>
}
            </Box>
            </Flex>
            </motion.div>
            </Center>
        </Box>
    )
}

export default Difficulty