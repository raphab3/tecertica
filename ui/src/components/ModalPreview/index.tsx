import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const ModalPreview = ({ imgPreview, isDown, shapes, isDisabled, textsArray }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('full')
  return (
    <>
      <Button isDisabled={isDisabled} colorScheme={(isDisabled) ? 'gray' : 'green'} onClick={onOpen}>Visualizar</Button>
      <Modal onClose={onClose} size={size} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pré-visualização</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
            {shapes?.length && textsArray?.length
              ? <Flex padding={0} display={'flex'} justifyContent={'center'} alignItems={'center'} position={'relative'}>
                <Image padding={0} h={570} w={770} src={imgPreview}/>
                {shapes.map((shape: any, index: any) => {
                  return (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'none', position: 'absolute', top: `${shape.y + 1}px`, left: `${shape.x}px`, height: `${shape.height}px`, width: `${shapes.width}px` }}>
                        <span style={{ inlineSize: `${shape.width}px`, textAlign: 'center', width: `${shape.width}`, fontSize: `${shape.height}px`, color: 'black', whiteSpace: 'nowrap', lineHeight: `${shapes.height}px`, border: 0, margin: 0, padding: 0 }}>{textsArray[index]?.value}</span>
                      </div>
                    </>
                  )
                })}
              </Flex>
              : ''
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
