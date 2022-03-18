import React from 'react'
import './styles.css'
import { Flex } from '@chakra-ui/react'
import Logout from 'src/shared/Providers/Auth/Logout.provider'
import { useAuth } from 'src/hooks/Auth'
export const SideMenu = () => {
  const { state } = useAuth()

  return (
    <>
      {state.token
        ? (
          <div className="side-bar" >
            <Flex align={'center'} direction={'column'} alignSelf={'flex-end'}
            >
              <a className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
                <Logout />
              </a>

            </Flex>

          </div>
        )
        : ''}

    </>
  )
}
