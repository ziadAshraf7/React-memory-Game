import { Box, Link } from '@chakra-ui/react'
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
import { Spinner } from '@chakra-ui/react'
import { CardsNumberPageProps } from '../Types/types'




function CardsNumber({
    selectedDifficulty ,
    setCardsNumber ,
    selectedCardsNumber ,
    authenticatedUser
}:CardsNumberPageProps){

    let cardsNumberArray = selectedDifficulty ? difficultyCardsNumber[selectedDifficulty] : []
    let navigate = useNavigate()
    const [user, loading] = useAuthState(auth)


    if(loading){
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
            </Center>
            )
    }

    if(selectedDifficulty == ""){
        return <Center w= {"100vw"} h = {"100vh"}>
                <Button href = {"../difficulty"} as = {Link}>
                    redirect to difficulty page
                </Button>
            </Center>
    }
    return (
        <Box w = "100vw"  h = "100vh" bg = "#521B41">
        <Center w = "full" h = "full" >
        <motion.div
              variants = {gameTypeSelectionVariant}
              initial = {"initial"}
              animate = {"visible"}
            >
        <Flex
         minWidth={250}
         width={[250 , 350 , 500 , 750 , 900]}
         justifyContent={"space-around"} flexDirection={"column"} h = "full" w = "full" >
        <Heading mb = {2} as='h1' color = "#FED7E2" size='lg' noOfLines={10}>
             Blocks number
        </Heading>
        <Box mb = {2}>
           {cardsNumberArray.map(item =>{
            console.log(item)
                return (
                    <motion.div 
                    key = {item}
                    onClick={() => setCardsNumber(item)} 
                    variants={selectionItems}
                    whileHover = {"hover"}
                    style={{
                        height : "50px" ,
                        marginBottom : "10px", 
                        display : "flex" ,
                        alignItems : "center" ,
                        padding : "10px",
                        width : "100%" , 
                        cursor : "pointer" , 
                        color : "#FFF5F5" ,
                        backgroundColor : selectedCardsNumber == item ? "RGBA(0, 0, 0, 0.24)" : "RGBA(0, 0, 0, 0.06)"
                    }}>{item}</motion.div>
                )
           })}
                   {selectedCardsNumber &&
                            <motion.button
                            variants={selectionBtn}
                            initial = {"initial"}
                            animate = {"visible"}
                        >
                <Button variant='outline' bg = {"grey.900"} color={"#EDF2F7"} _hover = {{color : "#1A202C" , bg : "#EDF2F7" , transition : "ease 0.8s" }} h = {8} w = {100} 
                 onClick={() => navigate("../game")}>
                    Next
                </Button>
                </motion.button>}
        </Box>
        </Flex>
        </motion.div>
        </Center>
    </Box>
    )
}


export default CardsNumber