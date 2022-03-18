import React from 'react'
import './style.css'
import { deleteFromStorage } from './../Storage.provider'
import { Button } from '@chakra-ui/react'
import { AiOutlineLogout } from 'react-icons/ai'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from 'src/hooks/Auth'

export default function Logout() {
  const { state, setState } = useAuth()

  const handleLogout = async (e: any) => {
    e.preventDefault()
    deleteFromStorage('token')
    setState({
      ...state,
      token: ''
    })

    return (
      <Routes>
        <Route path="*" element={<Navigate to={'/login'} />} />
      </Routes>
    )
  }

  return (
    <>
      <Button colorScheme='teal' variant='outline' onClick={handleLogout}>
        <AiOutlineLogout />{'  '} Sair
      </Button>
    </>
  )
}
