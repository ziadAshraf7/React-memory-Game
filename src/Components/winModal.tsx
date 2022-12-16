import { Modal, ModalOverlay, ModalContent, ModalBody, Center, ModalCloseButton } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import { modalPropsType } from "../Types/types"



function WinModal({
    isOpen ,
    onClose 
}:modalPropsType){
   
    return (
        <Modal
        onClose={onClose}
        isOpen={isOpen}
        size = {["xs","4xl"]}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalCloseButton />
                <ModalBody>
                    <Center w = {"full"} h = {"full"}>
                      <Image 
                      boxSize={[300 , 400]}
                       src={require("../imgs/—Pngtree—congrats celebrate with ceremony png_6615589.png")} />
                    </Center>
                </ModalBody>
        </ModalContent>

      </Modal>
    )
}


export default WinModal