import { HStack, Button, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, FormControl, FormLabel, Input, useDisclosure } from "@chakra-ui/react"
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, db } from "../firebase/config"


type props = {
    setCredError: React.Dispatch<React.SetStateAction<boolean>>
}

function Cred({
    setCredError
}:props){
    let navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()
    let name = useRef("")
    let [email , setEmail] = useState("")
    let [userId , setUserId] = useState("")
    let [isLoading , setIsLoading] = useState(false)
   
    function handleDrawerClose(){
        onClose()
        signOut(auth)
    }

    function handleCredForm(e : React.MouseEvent<HTMLFormElement>){
        e.preventDefault()
        setIsLoading(true)
        createNewUserDoc()
        navigate("../difficulty")
    }

    function createNewUserDoc(){
        let newUserDataRef = doc(db , "users" , userId)
        setDoc(newUserDataRef ,{                
            name : name.current ,
            Email : email , 
            rounds : []
        })
    }

    function checkForUserExistence(userId : string){
        let userDataRef = doc(db , "users" , userId)
        return  getDoc(userDataRef)
    }


    function handleCred(authProvider : any){
        const provider = new authProvider()
        signInWithPopup(auth , provider).then(result =>{
            checkForUserExistence(result.user.uid).then(snapShot =>{
                if(snapShot.data() !== undefined){
                    navigate("../difficulty")
                    return
                }
                onOpen()
                setUserId(result.user.uid)
                setEmail(result.user.email as string)
            })
            
        }).catch(err =>{
            if(err.code == "auth/account-exists-with-different-credential"){
                setCredError(true)
            }
        })
    }


    return (
    <>
        <Drawer
            onClose={handleDrawerClose} 
            isOpen={isOpen} 
            size={"full"}
            >

        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Center w = {"100%"} h = {"100%"}>
                <form onSubmit={handleCredForm}>
                <FormControl>
                    <FormLabel>name</FormLabel>
                        <Input 
                        required
                        onChange = {(e) => name.current = e.target.value}
                        type='text' 
                        mb={3}
                        />
                        <Button
                            isLoading = {isLoading}
                            loadingText='waiting'
                            colorScheme='teal'
                            variant='outline'
                            spinnerPlacement='end'
                            type="submit"
                        >
                            start
                        </Button>  
                    </FormControl>
                </form>

            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
             <HStack>
                 <Button onClick={() => handleCred(FacebookAuthProvider)} colorScheme='facebook'>Facebook</Button>
                 <Button onClick={() => handleCred(GoogleAuthProvider)}>Google</Button>
            </HStack>
                    
    </>
    )
}

export default Cred