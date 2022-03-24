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
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useToast
} from '@chakra-ui/react'
import { FiUpload } from 'react-icons/fi'
import {
  AiOutlinePlus,
  AiOutlineLine,
  AiOutlinePlusCircle
} from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { Canvas } from 'src/components/Canvas'
import { PreviewCertificate } from 'src/components/PreviewCertificate'

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
    if (jsonClients && page + 10 <= jsonClients.length) {
      setPage(page + 10)
    } else if (
      jsonClients &&
      page + 10 > jsonClients.length &&
      jsonClients.length >= 10
    ) {
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
                <span>
                  Lista de pessoas para certificar -{' '}
                  {jsonClients?.length ? jsonClients?.length - 1 : 0}
                </span>
                <span>
                  Página{' '}
                  {`${Math.ceil(page / 10) + 1} de ${
                    jsonClients?.length
                      ? Math.ceil(jsonClients?.length / 10)
                      : 1
                  }`}
                </span>
                <Box boxShadow={'dark-lg'}>
                  <input
                    className="input-none"
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
                  {jsonClients?.length ? (
                    <>
                      <Button onClick={previousPage}>Anterior</Button>
                      <Button marginLeft={10} onClick={nextPage}>
                        Próximo
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                </Flex>
              </Flex>
            </GridItem>
          </Flex>
        </Grid>
      </div>
    </>
  )
}
