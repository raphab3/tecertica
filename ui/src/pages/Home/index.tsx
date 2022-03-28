/* eslint-disable multiline-ternary */
import * as React from 'react'
import './style.css'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  useToast
} from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import { Canvas } from 'src/components/Canvas'
import { CsvList } from 'src/components/CsvList'

interface Shapes {
  index: number
  head: string
  x: number
  y: number
  width: number
  height: number
  fill: string
  isDragging: boolean
  strokeStyle: string
  lineWidth: number
}

export const Home = () => {
  const [page, setPage] = React.useState(0)
  const [jsonClients, setJsonClients] = React.useState<any[]>()
  const [shapes, setShapes] = React.useState<Shapes[]>([])
  const [preview, setPreview] = React.useState<any>()
  const [index, setIndex] = React.useState(0)
  const [isDown, setIsDown] = React.useState(-1)
  const [active, setActive] = React.useState(false)
  const ref = React.useRef<any>()
  const [models, setModels] = React.useState([
    {
      index: 0,
      url: require('../../assets/images/inicial.png'),
      name: 'selecione um certificado'
    },
    {
      index: 1,
      url: require('../../assets/images/model01.png'),
      name: 'modelo 1'
    },
    {
      index: 2,
      url: require('../../assets/images/model02.png'),
      name: 'modelo 2'
    },
    {
      index: 3,
      url: require('../../assets/images/model03.png'),
      name: 'modelo 3'
    }
  ])

  const toast = useToast()

  React.useEffect(() => {
    setPreview(models[0].url)
  }, [])

  const typesAccept = ['image/png', 'image/jpg', 'image/jpeg']

  function handleSubmit(e: any) {
    e.preventDefault()
    const select: any = document.getElementById('models')
    select.value = models[0].url
    const file = e.target.files[0]
    setPreview(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setPreview(reader.result)
      toast({
        title: 'Arquivo inserido',
        description: 'O certificado foi inserido com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true
      })
      resetInput()
    }
  }

  function resetInput() {
    ref.current.value = ''
  }

  React.useEffect(() => {
    const csv = window.localStorage.getItem('csv')
    if (csv) {
      setJsonClients(JSON.parse(csv))
    }
  }, [])
  return (
    <>
      <div className="content">
        <Grid
          padding={10}
          templateRows="1fr 1fr"
          templateColumns=" 1fr 1fr"
          bg="dark"
        >
          <Flex position={'absolute'} w="100vw" h="100vh">
            <GridItem>
              <Box flexDirection={'column'}>
                <Box
                  display={'flex'}
                  flexDir={'row'}
                  justifyContent={'space-between'}
                  margin={3}
                >
                  <Button
                    onClick={() =>
                      document.getElementById('certificate')?.click()
                    }
                    leftIcon={<FiUpload />}
                  >
                    Anexar Certificado
                  </Button>
                  <Select
                    boxShadow={'dark-lg'}
                    variant="filled"
                    id="models"
                    width="20vw"
                    onChange={(e: any) => {
                      setPreview(e.target.value)
                    }}
                  >
                    {models.map((model) => {
                      if (model.index === 0) {
                        return (
                          <option
                            key={model.index}
                            value={model.url}
                            selected
                            disabled
                            hidden
                            onSelect={() => {
                              setPreview(model.url)
                            }}
                          >
                            {model.name}
                          </option>
                        )
                      } else {
                        return (
                          <option key={model.index} value={model.url}>
                            {model.name}
                          </option>
                        )
                      }
                    })}
                  </Select>
                </Box>
                <Box boxShadow={'dark-lg'}>
                  <input
                    className="input-none"
                    ref={ref}
                    type="file"
                    name="certificate"
                    id="certificate"
                    onChange={(e: any) => {
                      if (typesAccept.includes(e.target.files[0].type)) {
                        handleSubmit(e)
                        setActive(true)
                      } else {
                        e.target.value = ''
                        alert('tipos aceitos png, jpg, jpeg')
                      }
                    }}
                    accept=".png,.jpg,.jpeg"
                  />
                </Box>
                <Canvas
                  index={index}
                  setIndex={setIndex}
                  jsonClients={jsonClients}
                  shapes={shapes}
                  setShapes={setShapes}
                  preview={preview}
                  setIsDown={setIsDown}
                  isDown={isDown}
                />
              </Box>
            </GridItem>
            <GridItem>
              <CsvList ref={ref} resetInput={resetInput} page={page} setPage={setPage} jsonClients={jsonClients} setJsonClients={setJsonClients} />
            </GridItem>
          </Flex>
        </Grid>
      </div>
    </>
  )
}
