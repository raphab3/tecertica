import React, { useState } from 'react'
import './style.css'
import { saveToStorage } from 'src/shared/Providers/Storage/Storage.provider'
import { useAuth } from 'src/hooks/Auth'
import { confirmPasswordReset, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, verifyPasswordResetCode } from 'firebase/auth'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from 'src/config/firebase.config'
import { Box, Button, ChakraProvider, Checkbox, Divider, FormControl, FormLabel, Heading, HStack, Image, Input, Stack, theme, useBreakpointValue, Text, useColorModeValue, ButtonGroup, VisuallyHidden, Container } from '@chakra-ui/react'
import logoImgFundoEscuro from '../../../assets/images/logo-fundo-escuro.svg'
import { GitHubIcon, GoogleIcon } from 'src/shared/utils/icons/googleIcons'
import { FaArrowAltCircleLeft, FaBackspace, FaBackward, FaFastBackward } from 'react-icons/fa'

async function loginUser(credentials: any) {
  let signIn: any = {}
  try {
    signIn = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
  } catch (err: any) {
    alert(err.message)
  }
  return { token: signIn.user.accessToken || '' }
}

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [confirmationPassword, setConfirmationPassword] = useState()
  const [createAccountPage, setCreateAccountPage] = useState(false)
  const [forgotPasswordPage, setForgotPasswordPage] = useState(false)
  const { state, setState } = useAuth()

  const googleProvider = new GoogleAuthProvider()
  const githubProvider = new GithubAuthProvider()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const token = await loginUser({
      email,
      password
    })
    handleSetToken(token.token)
  }

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email
        })
      }

      if (user) {
        handleSetToken(await user.getIdToken())
      }
    } catch (err) {
      console.error(err)
    }
  }

  const signInWithGithub = async () => {
    try {
      const res = await signInWithPopup(auth, githubProvider)
      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'github',
          email: user.email
        })
      }
      if (user) {
        handleSetToken(await user.getIdToken())
      }
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have signed up with a different provider for that email.')
      } else {
        console.error(error)
      }
    }
  }

  function handleSetToken(value: string) {
    saveToStorage('token', value)
    setState({
      ...state,
      token: value
    })
  }

  const handleRegistrationSubmit = async () => {
    if (password !== confirmationPassword) {
      alert('Senhas devem ser iguais')
      return
    }

    const credentials: any = {
      email,
      password
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth, credentials.email, credentials.password)
      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: name,
          authProvider: 'email',
          email: user.email
        })
      }

      handleSetToken(await user.getIdToken())
    } catch (err) {
      console.error(err)
    }
  }

  const providers = [
    { name: 'Google', icon: <GoogleIcon boxSize="5" /> },
    { name: 'GitHub', icon: <GitHubIcon boxSize="5" /> }
  ]

  const handleButton = (name: string) => {
    console.log(name)
    if (name === 'Google') {
      signInWithGoogle()
    }
    if (name === 'GitHub') {
      signInWithGithub()
    }
  }

  const handleSwithPageLoginOrRegister = () => {
    setCreateAccountPage(!createAccountPage)
    console.log('createAccountPage: ', createAccountPage)
  }

  const handleBackpage = () => {
    setCreateAccountPage(false)
  }

  const handleSendEmailForgotPassword = () => {
    try {
      sendPasswordResetEmail(auth, `${email}`)
      alert(`Email de recuperação enviado para: ${email}`)
      setForgotPasswordPage(false)
    } catch (error: any) {
      console.error(error)
    }
  }

  const pageRegister = () => {
    return (
      <div className='container'>
        <ChakraProvider theme={theme}>
          <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
              <Stack spacing="4">
                <div className='login-logo'>
                  <Image src={logoImgFundoEscuro} />
                </div>
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                  <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                    Faça seu cadastro
                  </Heading>
                  <HStack spacing="1" justify="center">

                    <Button variant="link" colorScheme="purple" onClick={handleBackpage}>
                      <FaArrowAltCircleLeft />&nbsp;Voltar
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                borderRadius={{ base: 'none', sm: 'xl' }}
              >
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="name">Nome Completo</FormLabel>
                      <Input id="name" type="text" onChange={(e: any) => setName(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" onChange={(e: any) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <Input id="password" type="password" onChange={(e: any) => setPassword(e.target.value)} />
                    </FormControl>
                    <FormControl>
                      <FormLabel htmlFor="confirmationPassword">Confirmar Senha</FormLabel>
                      <Input id="confirmationPassword" type="password" onChange={(e: any) => setConfirmationPassword(e.target.value)} />
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button bg={'#e7aa32'} variant="primary" color={'#312e81'} onClick={handleRegistrationSubmit}>Criar conta</Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </ChakraProvider>
      </div>
    )
  }

  const pageLogin = () => {
    return (
      <>
        <div className='container'>
          <ChakraProvider theme={theme}>
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
              <Stack spacing="8">
                <Stack spacing="4">
                  <div className='login-logo'>
                    <Image src={logoImgFundoEscuro} />
                  </div>
                  <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                      Faça login com sua conta
                    </Heading>
                    <HStack spacing="1" justify="center">
                      <span>Ainda não tem conta?</span>
                      <Button variant="link" colorScheme="purple" onClick={handleSwithPageLoginOrRegister}>
                        Registre-se
                      </Button>
                    </HStack>
                  </Stack>
                </Stack>
                <Box
                  py={{ base: '0', sm: '8' }}
                  px={{ base: '4', sm: '10' }}
                  bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                  boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                  borderRadius={{ base: 'none', sm: 'xl' }}
                >
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" onChange={(e: any) => setEmail(e.target.value)} />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="password">Senha</FormLabel>
                        <Input id="password" type="password" onChange={(e: any) => setPassword(e.target.value)} />
                      </FormControl>
                    </Stack>
                    <HStack justify="space-between">
                      <Checkbox defaultIsChecked>Lembrar</Checkbox>
                      <Button variant="link" colorScheme="purple" size="sm" onClick={() => setForgotPasswordPage(true)}>
                        Esqueceu sua senha?
                      </Button>
                    </HStack>
                    <Stack spacing="6">
                      <Button bg={'#e7aa32'} variant="primary" color={'#312e81'} onClick={handleSubmit}>Entrar</Button>
                      <HStack>
                        <Divider />
                        <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                          ou continue com
                        </Text>
                        <Divider />
                      </HStack>

                      <ButtonGroup variant="outline" spacing="4" width="full">
                        {providers.map(({ name, icon }) => (
                          <Button key={name} isFullWidth onClick={(e) => handleButton(name)}>
                            <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                            {icon}
                          </Button>
                        ))}
                      </ButtonGroup>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Container>
          </ChakraProvider >
        </div >
      </>
    )
  }

  const pageForgotPassword = () => {
    return <>
      <div className='container'>
        <ChakraProvider theme={theme}>
          <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
              <Stack spacing="4">
                <div className='login-logo'>
                  <Image src={logoImgFundoEscuro} />
                </div>
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                  <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                    Digite um e-mail válido
                  </Heading>
                  <HStack spacing="1" justify="center">

                    <Button variant="link" colorScheme="purple" onClick={() => setForgotPasswordPage(false)}>
                      <FaArrowAltCircleLeft />&nbsp;Voltar
                    </Button>
                  </HStack>
                </Stack>
              </Stack>
              <Box
                py={{ base: '0', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                borderRadius={{ base: 'none', sm: 'xl' }}
              >
                <Stack spacing="6">
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" onChange={(e: any) => setEmail(e.target.value)} />
                    </FormControl>
                  </Stack>
                  <Stack spacing="6">
                    <Button bg={'#e7aa32'} variant="primary" color={'#312e81'} onClick={handleSendEmailForgotPassword}>Enviar</Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </ChakraProvider>
      </div>
    </>
  }
  return (
    <>
      {
        forgotPasswordPage
          ? pageForgotPassword()
          : createAccountPage
            ? pageRegister()
            : (
              pageLogin()
            )
      }
    </>
  )
}
