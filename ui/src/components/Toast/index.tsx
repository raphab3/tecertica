import { Button, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'

export const ToastExample = ({ active, setActive }: any) => {
  const toast = useToast()

  useEffect(() => {
    if (active) {
      const button = document.getElementById('button') as any
      button?.click()
      setActive(false)
    }
  })
  return (
    <Button
      position={'absolute'}
      _hover={{ bg: 'none' }}
      cursor={'default'}
      variant='ghost'
      id="button"
      onClick={() =>
        toast({
          title: 'Arquivo inserido',
          description: 'O certificado foi inserido com sucesso',
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      }
    >
    </Button>
  )
}
