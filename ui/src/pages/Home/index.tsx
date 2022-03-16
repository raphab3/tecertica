import * as React from 'react'
import './style.css'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import { AiOutlinePlus, AiOutlineLine, AiOutlinePlusCircle } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { ColorModeSwitcher } from 'src/ColorModeSwitcher'
import { Canvas } from 'src/components/Canvas'

interface Shapes {
  index: number
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
  const [inputAdded, setInputAdded] = React.useState<string[]>([])
  const [headers, setHeaders] = React.useState(0)
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

  function isSelected() {
    if (shapes.length && isDown !== -1) {
      const shapesForSelect = shapes.map(shape => {
        (shape.index === isDown) ? shape.lineWidth = 4 : shape.lineWidth = 0
        return shape
      })
      setShapes(shapesForSelect)
    } else if (isDown === -1) {
      const shapesForSelect = shapes.map(shape => {
        shape.lineWidth = 0
        return shape
      })
      setShapes(shapesForSelect)
    }
  }
  React.useEffect(() => {
    isSelected()
  }, [isDown])

  function adicionaInput(name: any) {
    const randomNumber = Math.random()
    const positionX =
      250 + (randomNumber > 0.5 ? randomNumber * 200 : randomNumber * -200)
    const positionY =
      250 + (randomNumber > 0.5 ? randomNumber * 100 : randomNumber * -100)

    const shape = {
      index: index,
      head: name.toUpperCase(),
      x: positionX,
      y: positionY,
      width: 180,
      height: 20,
      fill: '#61ff04',
      isDragging: false,
      strokeStyle: 'black',
      lineWidth: 0
    }
    setIndex(index + 1)
    setShapes([...shapes, shape])
  }

  function increaseWidth() {
    if (shapes[isDown].width) {
      const inputs = [...shapes]
      inputs[isDown].width += 10
      setShapes(inputs)
    }
  }

  function increaseHeight() {
    if (shapes[isDown].height) {
      const inputs = [...shapes]
      inputs[isDown].height += 1
      setShapes(inputs)
    }
  }

  function decreaseWidth() {
    if (shapes[isDown].width > 10) {
      const inputs = [...shapes]
      inputs[isDown].width -= 10
      setShapes(inputs)
    }
  }

  function decreaseHeight() {
    if (shapes[isDown].height > 10) {
      const inputs = [...shapes]
      inputs[isDown].height -= 1
      setShapes(inputs)
    }
  }

  function removerInput() {
    const inputs = shapes.filter(shape => shape.index !== isDown)
    const newInputs = inputs.map(input => {
      if (input.index > isDown) {
        input.index -= 1
      }
      return input
    })
    setShapes(newInputs)
    setIndex(index - 1)
  }

  function processCsvToJson(csv: any) {
    const lines = csv.split(/\r?\n/g)
    const firstLine = lines[0]
    const columns = firstLine
      .split(/,/g)
      .map((value: any) => value.replace(/"/g, ''))
    const csvJson: any[] = []
    for (let i = 1; i < lines.length; i++) {
      const lineColumn = lines[i].split(/,/g)
      const lineColumnAltered = lineColumn.map((value: any) =>
        value.trim().toLowerCase().replace(/"/g, '')
      )
      let object = {}

      for (let i = 0; i <= columns.length; i++) {
        if (columns[i]) {
          object = { ...object, [columns[i]]: lineColumnAltered[i] }
        }
      }
      csvJson.push(object)
    }
    window.localStorage.setItem('csv', JSON.stringify(csvJson))
    setJsonClients(csvJson)
    resetInput()
  }

  function loadCsv(e: any) {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const csv = reader.result
      processCsvToJson(csv)
    }
    reader.readAsText(file)
  }

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

  function nextPage() {
    if ((jsonClients) && page + 10 <= jsonClients.length) {
      setPage(page + 10)
    } else if ((jsonClients) && (page + 10 > jsonClients.length && jsonClients.length >= 10)) {
      setPage(jsonClients?.length)
    }
  }

  function previousPage() {
    if (page > 0) {
      setPage(page - 10)
    }
  }

  function clearCsv() {
    window.localStorage.removeItem('csv')
    setJsonClients([])
  }

  React.useEffect(() => {
    const csv = window.localStorage.getItem('csv')
    if (csv) {
      setJsonClients(JSON.parse(csv))
    }
  }, [])
  return (
    <>
      <Flex>
        <ColorModeSwitcher />
      </Flex>
      <Grid padding={10} templateRows="1fr 1fr" templateColumns=" 1fr 1fr">
        <Flex position={'absolute'} w="100vw" h="100vh" bg={'light'}>
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
                  className='input-none'
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
              <Box display={'flex'} flexDir={'row'}>
                <Canvas shapes={shapes} setShapes={setShapes} preview={preview} setIsDown={setIsDown} isDown={isDown} />
                <Box borderRadius={10} boxShadow={'dark-lg'} bgImg={`url(${require('../../assets/images/background.png')})`} display={'flex'} justifyContent={'space-between'} alignContent={'space-between'} flexDir={'column'} >
                  <Box display={'flex'} width={screen.width / 9} flexDirection={'column'}>
                    <Button _hover={{ boxShadow: '10px 5px 5px black' }} colorScheme='teal' variant='solid' margin={5} type="button" onClick={adicionaInput} >Adicionar  {screen.width < 600 ? '' : 'Campo'}</Button>
                    <Button _hover={{ boxShadow: '10px 5px 5px black' }} colorScheme='teal' variant='solid' margin={5} type="button" onClick={removerInput}>Remover {screen.width < 600 ? '' : 'Campo'}</Button>
                  </Box>
                  <Box
                    display={'flex'}
                    width={window.screen.width / 9}
                    flexDirection={'column'}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignContent={'center'}
                    >
                      <Button
                        _hover={{ transform: 'scale(1.2)' }}
                        colorScheme="teal"
                        variant="solid"
                        iconSpacing={'auto'}
                        rightIcon={<AiOutlineLine />}
                        type="button"
                        onClick={decreaseWidth}
                      ></Button>

                      <Button
                        _active={{}}
                        _hover={{}}
                        cursor={'default'}
                        colorScheme="teal"
                        variant="outline"
                      >
                        largura
                      </Button>

                      <Button
                        _hover={{ transform: 'scale(1.2)' }}
                        colorScheme="teal"
                        variant="solid"
                        iconSpacing={'auto'}
                        rightIcon={<AiOutlinePlus />}
                        type="button"
                        onClick={() => {
                          increaseWidth()
                        }}
                      ></Button>
                    </Box>

                    <Box
                      marginBottom={10}
                      marginTop={10}
                      display={'flex'}
                      justifyContent={'center'}
                      alignContent={'center'}
                    >
                      <Button
                        _hover={{ transform: 'scale(1.2)' }}
                        colorScheme="teal"
                        variant="solid"
                        iconSpacing={'auto'}
                        rightIcon={<AiOutlineLine />}
                        type="button"
                        onClick={decreaseHeight}
                      ></Button>

                      <Button
                        _active={{}}
                        _hover={{}}
                        cursor={'default'}
                        colorScheme="teal"
                        variant="outline"
                      >
                        altura
                      </Button>

                      <Button
                        _hover={{ transform: 'scale(1.2)' }}
                        colorScheme="teal"
                        variant="solid"
                        iconSpacing={'auto'}
                        rightIcon={<AiOutlinePlus />}
                        type="button"
                        onClick={() => {
                          increaseHeight()
                        }}
                      ></Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Flex marginTop={5} align={'center'} justify={'center'}>
              <Flex bgImg={`url(${require('../../assets/images/background.png')})`} borderRadius={10} padding={5} gap={6} margin={'auto auto'}>
                {(jsonClients?.length) ? Object.keys(jsonClients[0]).map(header => <Button key={header} value={header} onClick={(e) => adicionaInput(e.currentTarget.value)} colorScheme='teal' leftIcon={<AiOutlinePlusCircle color={'green'} style={{ fontSize: '1.5em' }} />}>{header}</Button>) : ''}
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              marginTop={5}
              marginLeft={10}
              flexDir={'column'}
              align={'center'}
            >
              <Flex gap={5}>
                <Button
                  onClick={() => document.getElementById('CSV')?.click()}
                  leftIcon={<FiUpload />}
                  marginBottom={5}
                >
                  Adicionar CSV
                </Button>
                <Button leftIcon={<BsTrash />} onClick={clearCsv}>
                  Limpar CSV
                </Button>
              </Flex>
              <span>Lista de pessoas para certificar - {(jsonClients?.length) ? jsonClients?.length - 1 : 0}</span>
              <span>Página {`${Math.ceil(page / 10) + 1} de ${(jsonClients?.length) ? Math.ceil(jsonClients?.length / 10) : 1}`}</span>
              <Box boxShadow={'dark-lg'}>
                <input
                  className='input-none'
                  ref={ref}
                  type="file"
                  name="CSV"
                  id="CSV"
                  onChange={(e: any) => {
                    if (
                      ['application/vnd.ms-excel', 'text/csv'].includes(
                        e.target.files[0].type
                      )
                    ) {
                      loadCsv(e)
                    } else {
                      e.target.value = ''
                      alert('ERROR: Tipo Incorreto, tipo aceito => .csv')
                    }
                  }}
                  accept="text/csv"
                />
              </Box>
              <Table
                size={'sm'}
                variant={'striped'}
                colorScheme={'teal'}
                margin={5}
              >
                <Thead>
                  <Tr>
                    {jsonClients?.length
                      ? Object.keys(jsonClients[0]).map((column) => (
                        <Td key={Math.random()}>{column}</Td>
                      ))
                      : []}
                  </Tr>
                </Thead>
                <Tbody>
                  {jsonClients?.length
                    ? jsonClients
                      .map((client: any) => (
                        <Tr>
                          {Object.values(client).map((column: any) => (
                            <Td
                              key={Math.random()}
                              maxW={200}
                              overflow={'hidden'}
                              textOverflow={'ellipsis'}
                              whiteSpace={'nowrap'}
                            >
                              {column}
                            </Td>
                          ))}
                        </Tr>
                      ))
                      .slice(page, page + 10)
                    : []}
                </Tbody>
              </Table>
              <Flex justify={'space-between'}>
                {jsonClients?.length
                  ? (
                    <>
                      <Button onClick={previousPage}>Anterior</Button>
                      <Button marginLeft={10} onClick={nextPage}>
                        Próximo
                      </Button>
                    </>
                  )
                  : ''
                }
              </Flex>
            </Flex>
          </GridItem>
        </Flex>
      </Grid>
    </>
  )
}
