/* eslint-disable func-call-spacing */
import React from 'react'

import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, FormLabel, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Stack, Textarea, useDisclosure } from '@chakra-ui/react'
import { ModalPreview } from '../ModalPreview'

export const PreviewCertificate = ({ shapes, imgPreview, jsonClients }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef() as any
  const [textField, setTextField] = React.useState('')
  const [textsArray, setTextsArray] = React.useState<any[]>([])
  const [step, setStep] = React.useState(0)
  console.log(textsArray)
  return (
    <>
      <Button title={!(shapes.length) ? 'Adicione pelo menos um input' : ''} isDisabled={!(shapes.length)} _hover={{ boxShadow: '10px 5px 5px black' }} colorScheme='teal' variant='solid' margin={5} type="button" onClick={onOpen}>Pré-visualização</Button>
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
              <Box>
                * Se não quiser adicionar um campo, remova-o na página anterior
              </Box>
              {(jsonClients?.length)
                ? shapes.map((shape: any, index: any) => {
                  if (step !== index) {
                    return (
                      <>
                        <Box style={{ transform: 'scale(0.85)', color: 'gray', cursor: 'not-allowed' }}>
                          <FormLabel htmlFor='username'>Insira o {shape.head.toUpperCase()}</FormLabel>
                          <Input
                            disabled={true}
                            ref={firstField}
                            placeholder='Ex: CPF da pessoa, nome da pessoa...'
                            onChange={(e) => setTextField(e.currentTarget.value)}
                          />
                          <Button disabled={true} margin={5}>adicionar</Button>

                          {index < step
                            ? <Button colorScheme={'red'} onClick={() => {
                              setStep(index)
                              const fields: any = [...textsArray] as any
                              fields[index].isEditing = true
                              setTextField(fields[index].value)
                              setTextsArray([...fields])
                            }
                            }>Editar</Button>
                            : ''
                          }
                        </Box>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <Box>
                          <FormLabel htmlFor='username'>Insira o {shape.head.toUpperCase()}</FormLabel>
                          <Input
                            ref={firstField}
                            placeholder='Ex: CPF da pessoa, nome da pessoa...'
                            value={(textsArray[index]?.isEditing) ? textField : textsArray[index]?.value}
                            onChange={(e) => setTextField(e.currentTarget.value)}
                          />
                          <Button colorScheme={'green'} margin={5} onClick={() => {
                            if (textsArray[index]) {
                              const fields: any = [...textsArray] as any
                              fields[index].value = textField
                              fields[index].isEditing = false
                              setStep(textsArray.length)
                              setTextsArray([...fields])
                            } else {
                              setTextsArray([...textsArray, {
                                header: shape.head.toUpperCase(),
                                index: index,
                                isEditing: false,
                                value: textField
                              }])
                              setStep(step + 1)
                            }
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
