import { Center, Link } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { motion } from "framer-motion";
import { HomePageProps } from '../Types/types'
import { headingVariant, subHeadingVariant } from './framer motion variants/variants'





function Home({
   authenticatedUser
}:HomePageProps){


    return (
        <>
        <Center textAlign={"center"}  bg = {"#212121"} w = {"100vw"} h = {"100vh"}>
        
         <motion.div
            variants={headingVariant}
            initial = {"initial"}
            animate = {"visible"}
         >
         
           <Heading mb = {3}  letterSpacing={[5 , 10]} size = {["2xl" , "3xl" , "4xl" ]} color={"#616060"}>Memory Game</Heading>
              
               <motion.div
                  variants={subHeadingVariant}
               >
                 <Text letterSpacing={[1,2]} fontFamily={'sans , serif'} mb = {3} fontSize = {["xs" , "lg" , "xl"]} color={"#f5f5f5"}>you can choose difficulty level</Text>
                </motion.div>

                <motion.div
                  variants={subHeadingVariant}
                >
                    <Text letterSpacing={[1,2]} fontFamily={'sans , serif'} mb = {5} fontSize = {["xs" , "lg" , "xl" ]} color={"#f5f5f5"}>you can choose your Blocks number</Text>
               </motion.div>
           
                <motion.button
                  variants={subHeadingVariant}
               >
                    <Button as={Link} size = {["xs" , "sm" , "md" ]} href = {authenticatedUser ?  "difficulty" : "register"}>Get Started</Button>
               </motion.button>

            </motion.div>
        </Center>
        </>
    )
}


export default Home