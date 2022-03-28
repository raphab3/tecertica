import { Box, Button, Flex, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'
import { FiUpload } from 'react-icons/fi'

export const CsvList = ({ jsonClients, setJsonClients, page, setPage, resetInput, ref }: any) => {
  function processCsvToJson(csv: any) {
    const lines = csv.split(/\r?\n/g)
    const firstLine = lines[0]
    const columns = firstLine
      .split(/,/g)
      .map((value: any) => value.replace(/"/g, ''))
    const csvJson: any[] = []
    for (let i = 1; i < lines?.length; i++) {
      const lineColumn = lines[i].split(/,/g)
      const lineColumnAltered = lineColumn.map((value: any) =>
        value.trim().toLowerCase().replace(/"/g, '')
      )
      let object = {}

      for (let i = 0; i <= columns?.length; i++) {
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

  function nextPage() {
    if (jsonClients && page + 10 < jsonClients?.length) {
      setPage(page + 10)
    } else if (
      jsonClients &&
      page + 10 > jsonClients?.length &&
      jsonClients?.length >= 10
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
    setPage(0)
  }

  return (
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
      {(jsonClients?.length)
        ? <span>
          Página{' '}
          {`${Math.ceil(page / 10) + 1} de ${jsonClients?.length
            ? Math.ceil(jsonClients?.length / 10)
            : 1
            }`}
        </span>
        : ''
      }
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
        {jsonClients?.length
          ? (
            <>
              <Button onClick={previousPage}>Anterior</Button>
              <Button marginLeft={10} onClick={nextPage}>
                Próximo
              </Button>
            </>
          )
          : (
            ''
          )}
      </Flex>
    </Flex>
  )
}
