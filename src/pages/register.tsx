import { Button, Center, Link, Spinner, VStack } from "@chakra-ui/react"
import  {useEffect, useState } from "react"
import Login from "../Components/Login"
import SignUp from "../Components/signUp"
import { Text } from '@chakra-ui/react'
import { auth } from "../firebase/config"
import { motion, AnimatePresence } from "framer-motion"
import Cred from "../Components/cred"
import { useAuthState } from 'react-firebase-hooks/auth';
import {
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
import { headingVariant } from "./framer motion variants/variants"



type props = {
    authenticatedUser : boolean | undefined
}


function Register({
    authenticatedUser
}:props){

    let [authState , setAuthState] = useState("signup")
    let [credError , setCredError] = useState(false)
    const [user, loading, error] = useAuthState(auth)

    useEffect(() =>{
        if(credError){
            setTimeout(() => {
                setCredError(false)
            }, 5000);
        }
    },[credError])
    
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
    
    if(authenticatedUser){
        return (
            <Center w = {"100vw"} h = {"100vh"}>
                <Button as = {Link} href = {"../"} colorScheme={"teal"}>home page</Button>
            </Center>
            )
    }
    return(
        <>

    <Center bg = {"#1A202C"} textAlign={"center"} w = {"100vw"} h = {"100vh"}>

    <VStack>
        {credError &&  
                <Alert status='error'>
                        <AlertIcon />
                        This account is exist with different Credential
                    </Alert>}

                    
        <AnimatePresence>
            <motion.div
                variants={headingVariant}
                key = {authState}
                initial = {"initial"}
                animate = {"visible"}
                exit={{
                    y : "-100vh" ,
                    transition : {
                        duration : 0.5 ,
                    }
                }}
            >
               {authState == "signup" ? <SignUp /> : <Login />}
               </motion.div>
               </AnimatePresence>

        <AnimatePresence>
            <motion.div
                key = {authState}
                initial = {{opacity : 0}}
                animate = {{opacity : 1}}
                exit={{
                    opacity : 1 ,
                    transition : {
                        duration : 0.5 ,
                    }
                }}
            >
                
               {authState == "signup" ? <Text color={"#eee"} onClick={() => setAuthState("login")} as = {"button"}>Login?</Text> 
                : <Text color={"#eee"} onClick={() => setAuthState("signup")} as = {"button"}>SignUp?</Text>}
                </motion.div>
                </AnimatePresence>

                
                <Cred 
                    setCredError = {setCredError}
                />

                </VStack> 

            </Center> 
        </>
    )
}


export default Register