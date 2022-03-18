import React from 'react'
import './styles.css'
import { Flex, Image, scaleFadeConfig } from '@chakra-ui/react'
import Logout from 'src/shared/Providers/Auth/Logout.provider'
import { useAuth } from 'src/hooks/Auth'
import { ColorModeSwitcher } from 'src/ColorModeSwitcher'
import logoImg from '../../assets/images/logotipo.svg'

export const SideMenu = () => {
  const { state } = useAuth()

  return (
    <>
      {state.token
        ? (
          <div className="side-bar"
            style={{ maxWidth: 60 }}>
            <Flex direction={'column'} alignItems={'center'}>
              <div className='sidebar-logo'>
                <Image src={logoImg} />
              </div>
              <span className='sidebar-divider'></span>

              <Flex>
                <ColorModeSwitcher border={0} margin={0} />
              </Flex>

            </Flex>

            <div className='sidebar-logout'>
              <Logout />
            </div>
          </div>
        )
        : ''
      }

    </>
  )
}
