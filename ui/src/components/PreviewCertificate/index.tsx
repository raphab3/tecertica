import React from 'react'

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from '@chakra-ui/react'
import { ModalPreview } from '../ModalPreview'

export const PreviewCertificate = ({ shapes, imgPreview, jsonClients }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef() as any
  const [textField, setTextField] = React.useState('')
  const [textsArray, setTextsArray] = React.useState<any[]>([])
  const [step, setStep] = React.useState(0)
  return (
    <>
      <Button isDisabled={!(shapes.length)} _hover={{ boxShadow: '10px 5px 5px black' }} colorScheme='teal' variant='solid' margin={5} type="button" onClick={onOpen}>Pré-visualização</Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={() => {
          onClose()
          setTextsArray([])
          setStep(0)
          setTextField('')
        }
        }
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Crie uma pré-visualização
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              {(jsonClients?.length)
                ? shapes.map((shape: any, index: any) => {
                  if (step !== index) {
                    return (
                      <>
                        <Box style={{ transform: 'scale(0.85)', color: 'gray', cursor: 'not-allowed' }}>
                          <FormLabel htmlFor='username'>Insira o conteúdo do {shape.head.toUpperCase()}</FormLabel>
                          <Input
                            disabled={true}
                            ref={firstField}
                            placeholder='Ex: CPF da pessoa, nome da pessoa...'
                            onChange={(e) => setTextField(e.currentTarget.value)}
                          />
                          <Button disabled={true} margin={5} onClick={() => {
                            setTextsArray([...textsArray, {
                              head: shape.head.toUpperCase(),
                              value: textField
                            }])
                            setStep(step + 1)
                            setTextField('')
                          }}>adicionar</Button>
                        </Box>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <Box>
                          <FormLabel htmlFor='username'>Insira o conteúdo do {shape.head.toUpperCase()}</FormLabel>
                          <Input
                            ref={firstField}
                            placeholder='Ex: CPF da pessoa, nome da pessoa...'
                            value={textField}
                            onChange={(e) => setTextField(e.currentTarget.value)}
                          />
                          <Button colorScheme={'green'} margin={5} onClick={() => {
                            setTextsArray([...textsArray, {
                              header: shape.head.toUpperCase(),
                              value: textField
                            }])
                            setStep(step + 1)
                            setTextField('')
                          }}>adicionar</Button>
                        </Box>
                      </>
                    )
                  }
                }
                )
                : ''}
            </Stack>
          </DrawerBody>

          <DrawerFooter display={'flex'} justifyContent={'space-around'} borderTopWidth='1px'>
            {(shapes?.length === step)
              ? <ModalPreview textsArray={textsArray} isDisabled={false} imgPreview={imgPreview} shapes={shapes} textField={textField}/>
              : <ModalPreview isDisabled={true} imgPreview={imgPreview} shapes={shapes} textField={textField}/>
            }
            <Button padding={3} colorScheme={'red'} onClick={() => {
              onClose()
              setTextsArray([])
              setStep(0)
            }}>
              Voltar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
