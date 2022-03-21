import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const ModalPreview = ({ imgPreview, isDown, shapes, isDisabled, textsArray }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [size, setSize] = React.useState('full')
  const models = ['model01.09d9dbb66f2b5c8b7290.png', 'model02.e643f9173eff7d7c2f90.png', 'model03.4fbf708a3b6dbac3789c.png']
  const setColorBackground = () => {
    console.log(imgPreview)
    switch (true) {
    case imgPreview.includes(models[0]): return '#FFFBF0'
    case imgPreview.includes(models[1]): return '#F6FAF7'
    case imgPreview.includes(models[2]): return '#FEFEFE'
    default: return 'none'
    }
  }
  console.log(imgPreview.includes(models[1]))
  return (
    <>
      <Button title={(isDisabled) ? 'É necessário preencher todos os campos' : ''} isDisabled={isDisabled} colorScheme={(isDisabled) ? 'gray' : 'green'} onClick={onOpen}>Visualizar</Button>
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
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: `${setColorBackground()}`, position: 'absolute', top: `${shape.y + 1}px`, left: `${shape.x}px`, height: `${shape.height}px`, width: `${shapes.width}px` }}>
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
