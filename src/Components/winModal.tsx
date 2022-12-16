import { Modal, ModalOverlay, ModalContent, ModalBody, Center, ModalCloseButton } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react'
import { modalPropsType } from "../Types/types"
import { motion } from "framer-motion";



function WinModal({
    isOpen ,
    onClose 
}:modalPropsType){
  if(!isOpen){
    return <span></span>
  }
    return (


        <Modal
        onClose={onClose}
        isOpen={isOpen}
        size = {["xs","4xl"]}
      >
    <motion.div
        initial = {{
          opacity : 0
        }}
        animate = {{
          opacity : 1,
          transition : {
            duration : 0.8
          }
        }}
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
        </motion.div>

      </Modal>
    )
  }




export default WinModal