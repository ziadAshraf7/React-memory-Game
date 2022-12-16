import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from "@chakra-ui/react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase/config"


function SignUp(){
    let navigate = useNavigate()

    let name = useRef("")
    let email = useRef("")
    let Password = useRef<number>()
    let rePassword = useRef<number>()

    let [passwordLengthError , setPasswordLengthError] = useState(false)
    let [passwordError , setPasswordError] = useState(false)
    let [isLoading , setIsLoading] = useState(false)
    let [usedEmailError , setUsedEmailError] = useState(false)

    function handleSignUp(email: string , Password: number | undefined , rePassword: number | undefined , name: string){
        setIsLoading(true)
        if(Password !== rePassword ){
            setPasswordError(true)
            setIsLoading(false)
            setPasswordLengthError(false)
            setUsedEmailError(false)
        }else{
            createUserWithEmailAndPassword(auth , email , Password as unknown as string).then(snapshot =>{
                let userId = snapshot.user.uid
                let userDoc = doc(db , "users" ,userId)
                navigate("../difficulty")
                setIsLoading(false)
                setDoc(userDoc , {
                    name : name ,
                    Email : email , 
                    rounds : []
                })
            }).catch(err =>{

                setIsLoading(false)
                if(err.code == "auth/weak-password"){
                    setPasswordLengthError(true)
                    setUsedEmailError(false)
                }

                if(err.code == "auth/email-already-in-use"){
                    setUsedEmailError(true)
                    setPasswordLengthError(false)
                }
            })
        }
    }


    

    return (

<form  onSubmit={(e) => {
    e.preventDefault()
    handleSignUp(email.current , Password.current , rePassword.current , name.current)
}} >

 <VStack  boxShadow = {"lg"} borderRadius = {"md"} bg={"#eee"} p = {10} spacing={3}>

   <FormControl
    borderColor={"#718096"}
        >
        <FormLabel>name</FormLabel>
            <Input 
            required
            type='text' 
            onChange={(e) => name.current = e.target.value} 
            />
    </FormControl>
        

    <FormControl
        borderColor={"#718096"}
        isInvalid={usedEmailError}
        >
            <FormLabel>Email</FormLabel>
            <Input 
            required
            type='email' 
            onChange={(e) => email.current = e.target.value} 
            />
        {usedEmailError && <FormErrorMessage>Email is already in use</FormErrorMessage>}
    </FormControl>


    
    <FormControl
            borderColor={"#718096"}

        isInvalid={passwordLengthError || passwordError}
        >
         <FormLabel>Password</FormLabel>
            <Input 
            required
            type='password' 
            onChange={(e) => Password.current = Number(e.target.value)} 
            />
        {passwordLengthError && <FormErrorMessage>the password must be at least 6 chars</FormErrorMessage>}
        {passwordError && <FormErrorMessage>password field must equal re-password field</FormErrorMessage>}     
    </FormControl>



    <FormControl
            borderColor={"#718096"}
        isInvalid={passwordLengthError || passwordError}
        >
        <FormLabel>re-Password</FormLabel>
            <Input 
            required
            type='password' 
            onChange={(e) => rePassword.current =  Number(e.target.value)} 
            />
        {passwordLengthError && <FormErrorMessage>the password must be at least 6 chars</FormErrorMessage>}
        {passwordError && <FormErrorMessage>password field must equal re-password field</FormErrorMessage>}  
    </FormControl>

    <Button
    isLoading = {isLoading}
    loadingText='Signing up'
    colorScheme='teal'
    variant='outline'
    spinnerPlacement='end'
    type="submit"
  >
    SignUp
  </Button>
        
    </VStack>

    </form>

    )
}


export default SignUp