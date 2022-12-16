import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Center, IconButton, Flex } from "@chakra-ui/react"
import { Text } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase/config";
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { modalPropsType } from "../Types/types";



function UserInfoModal({
    isOpen ,
    onClose 
}:modalPropsType){
    
    let navigate = useNavigate()

    const [user] = useAuthState(auth)
    let [userLastResults , setUserLastResults] = useState<any[]>([])
    let [userName , setUserName] = useState("")

    useEffect(() =>{
        if(user){
            let userDataRef = doc(db , "users" , user.uid)
            onSnapshot(userDataRef , (snapShot =>{
              let userData = snapShot.data()
              if(userData){
                setUserLastResults(userData.rounds)
                setUserName(userData.name)
              }
            }))
        }
    },[])
console.log(userName)

    return (
        <Modal
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior={"outside"}
        size = {["xs","4xl"]}
      >
        <ModalOverlay />

        <ModalContent>
              <ModalBody>
                <ModalCloseButton />
                <IconButton  onClick={() => {
                        navigate("../")
                        signOut(auth)
                    } } aria-label={""}>
                        <img src={require("../imgs/log-out.svg").default} />
                    </IconButton>

             <Center><Text fontSize={"xl"} fontFamily={'Pacifico'} as = {"i"}>{userName}</Text></Center>

             {userLastResults?.length == 0 &&<Center><Text>no last game results yet</Text></Center>}

              { userLastResults.length > 0 && <TableContainer>
                <ModalHeader>Last Results</ModalHeader>
             <Table variant='simple'>
                 <Thead>
                            <Tr>
                                <Th>difficulty</Th>
                                <Th>game Blocks</Th>
                                <Th>wrong Tries</Th>
                                <Th >passed Game Time</Th>
                                <Th isNumeric>Date</Th>
                            </Tr>
                    </Thead>

                        {userLastResults.length > 0 && userLastResults.map((item , index) =>{
                            let date = new Date(item.date.seconds * 1000)
                            return (
                            <Tbody key = {index}>
                                <Tr>
                                    <Td>{item.difficulty}</Td>
                                    <Td>{item.gameBlocksNumber}</Td>
                                    <Td >{item.wrongTries}</Td>
                                    <Td >{item.passedGameTime.minutes}:{item.passedGameTime.seconds}</Td>
                                    <Td isNumeric>{date.toLocaleDateString()}</Td>
                                </Tr>
                                </Tbody>
                            )
                        })}

                        <Tfoot>
                                <Tr>
                                    <Th>difficulty</Th>
                                    <Th>game Blocks</Th>
                                    <Th>wrong Tries</Th>
                                    <Th >passed Game Time</Th>
                                    <Th isNumeric>Date</Th>
                                </Tr>
                            </Tfoot>

                </Table>
                </TableContainer>
            }      
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>

             </ModalBody>
            </ModalContent>


      </Modal>
    )
}


export default UserInfoModal