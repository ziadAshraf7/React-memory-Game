import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Box, Button, VStack } from "@chakra-ui/react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"


function Login(){
    let navigate = useNavigate()

    let email = useRef("")
    let Password = useRef<number>()
    let [isLoading , setIsLoading] = useState(false)

    let [wrongPasswordError , setWrongPasswordError] = useState(false)
    let [validEmailError , setValidEmailError] = useState(false)


    function handleLogin(email: string , password: number){
        setIsLoading(true)
        signInWithEmailAndPassword(auth,email,password as unknown as string).then(() =>{
                navigate("../difficulty")
        }).catch(err =>{
            setIsLoading(false)
            if(err.code == "auth/user-not-found"){
                setValidEmailError(true)
                setWrongPasswordError(false)

            }

            if(err.code == "auth/wrong-password"){
                setWrongPasswordError(true)
                setValidEmailError(false)

            }
        })
    }



    return (
        <form  onSubmit={(e) => {
            e.preventDefault()
            handleLogin(email.current , Password.current as number)
        }} >
        
         <VStack bg={"#eee"} boxShadow = {"lg"} borderRadius = {"md"} p = {10} spacing={3}>
        
            <FormControl
                borderColor={"#718096"}
                isInvalid={validEmailError}
                >
                    <FormLabel>Email</FormLabel>
                    <Input 
                    required
                    onChange = {(e) => email.current = e.target.value}
                    type='email' 
                    />
              <FormErrorMessage>email is not exist</FormErrorMessage>
            </FormControl>
        
            
            <FormControl
                borderColor={"#718096"}
                isInvalid={wrongPasswordError}
                >
                 <FormLabel>Password</FormLabel>
                    <Input 
                    onChange = {(e) => Password.current = e.target.value as unknown as number}
                    required
                    type='password' 
                    />
                <FormErrorMessage>wrong password</FormErrorMessage>
             </FormControl>
        
                    <Button
                    isLoading = {isLoading}
                    loadingText='Loging in'
                    colorScheme='teal'
                    variant='outline'
                    spinnerPlacement='end'
                    type="submit"
                >
                    Login
                </Button>  

            </VStack>
        
            </form>
    )
}


export default Login