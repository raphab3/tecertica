/* eslint-disable multiline-ternary */
import { Box, Button, Flex } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import {
  AiOutlineLine,
  AiOutlinePlus,
  AiOutlinePlusCircle
} from 'react-icons/ai'
import { PreviewCertificate } from '../PreviewCertificate'
import './styles.css'

export const Canvas = ({
  shapes,
  setShapes,
  preview,
  setIsDown,
  isDown,
  jsonClients,
  index,
  setIndex
}: any) => {
  const [startX, setStartX] = React.useState(0)
  const [startY, setStartY] = React.useState(0)
  const [dragok, setDragok] = React.useState(false)
  const [offsetX, setOffsetX] = React.useState(0)
  const [offsetY, setOffsetY] = React.useState(0)
  const [WIDTH, setWIDTH] = React.useState(0)
  const [HEIGHT, setHEIGHT] = React.useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const BB = canvas.getBoundingClientRect()
    setOffsetX(BB.left)
    setOffsetY(BB.top)
    canvas.width = 768
    canvas.height = 568
    setWIDTH(canvas.width)
    setHEIGHT(canvas.height)
    canvas.onmousedown = myDown
    canvas.onmouseup = myUp
    canvas.onmousemove = myMove
    draw()

    function rect(r: any) {
      context.beginPath()
      context.fillStyle = r.fill
      if (r.lineWidth) {
        context.lineWidth = r.lineWidth
        context.strokeStyle = r.strokeStyle
        context.strokeRect(r.x, r.y, r.width, r.height)
        context.fillText(r.head, r.x, r.y - 4)
      } else {
        context.fillText(r.head, r.x, r.y)
      }
      context.fillRect(r.x, r.y, r.width, r.height)
      context.imageSmoothingEnabled = true
      context.closePath()
    }

    function draw() {
      for (let i = 0; i < shapes.length; i++) {
        rect(shapes[i])
      }
    }

    function myDown(e: any) {
      const mx = e.clientX - offsetX
      const my = e.clientY - offsetY
      setDragok(false)
      const s: any = shapes[isDown]
      console.log(s)
      if (
        s &&
        ((mx < s.x && mx < s.x + s.width) ||
          (mx > s.x && mx > s.x + s.width) ||
          (my > s.y && my > s.y + s.height) ||
          (my < s.y && my < s.y + s.height))
      ) {
        setIsDown(-1)
      }
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i]
        if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
          setDragok(true)
          setIsDown(s.index)
          const shapesForChanged = [...shapes]
          shapesForChanged[i].isDragging = true
          setShapes(shapesForChanged)
          console.log(s)
        }
      }
      setStartX(mx)
      setStartY(my)
    }

    function myUp(e: any) {
      setDragok(false)
      for (let i = 0; i < shapes.length; i++) {
        const shapesForChanged = [...shapes]
        shapesForChanged[i].isDragging = false
        setShapes(shapesForChanged)
      }
    }
    function myMove(e: any) {
      if (dragok) {
        const mx = e.clientX - offsetX
        const my = e.clientY - offsetY
        const dx = mx - startX
        const dy = my - startY

        for (let i = 0; i < shapes.length; i++) {
          const s = shapes[i]
          if (s.isDragging) {
            if (dx < 0) {
              s.x += s.x > 0 ? dx : 1
            } else if (dx > 0) {
              s.x += s.x > WIDTH - s.width ? -1 : dx
            }

            if (dy < 0) {
              s.y += s.y > 0 ? dy : 1
            } else if (dy > 0) {
              s.y += s.y > HEIGHT - s.height ? -1 : dy
            }
            console.log(s)
          }
        }

        draw()

        setStartX(mx)
        setStartY(my)
      }
    }
  }, [isDown, shapes, startX, startY, offsetX, offsetY])

  useEffect(() => {
    if (preview) {
      const stylesCanvas: any = document.getElementById('canvas')
      stylesCanvas.style.backgroundImage = `url(${preview})`
      stylesCanvas.style.width = 768
      stylesCanvas.style.height = 568
    }
  }, [preview])

  function isSelected() {
    if (shapes.length && isDown !== -1) {
      const shapesForSelect = shapes.map((shape: any) => {
        shape.index === isDown ? (shape.lineWidth = 4) : (shape.lineWidth = 0)
        return shape
      })
      setShapes(shapesForSelect)
    } else if (isDown === -1) {
      const shapesForSelect = shapes.map((shape: any) => {
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
      head: name,
      x: positionX,
      y: positionY,
      width: 180,
      height: 20,
      fill: '#312e8157',
      isDragging: false,
      strokeStyle: '#E7AA32',
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
    const inputs = shapes.filter((shape: any) => shape.index !== isDown)
    const newInputs = inputs.map((input: any) => {
      if (input.index > isDown) {
        input.index -= 1
      }
      return input
    })
    setShapes(newInputs)
    setIndex(index - 1)
  }

  return (
    <>
      <Box display={'flex'} flexDir={'row'}>
        <canvas style={{ border: 0 }} id="canvas" ref={canvasRef} />
        <Box
          borderRadius={10}
          boxShadow={'dark-lg'}
          bgImg={`url(${require('../../assets/images/background.png')})`}
          display={'flex'}
          justifyContent={'space-between'}
          alignContent={'space-between'}
          flexDir={'column'}
        >
          <Box
            display={'flex'}
            width={screen.width / 9}
            flexDirection={'column'}
          >
            <PreviewCertificate
              imgPreview={preview}
              shapes={shapes}
              isDown={isDown}
              jsonClients={jsonClients}
            />
            <Button
              title={isDown === -1 ? 'selecione um campo pra ser removido' : ''}
              disabled={isDown === -1}
              _hover={{ boxShadow: '10px 5px 5px black' }}
              colorScheme="teal"
              variant="solid"
              margin={5}
              type="button"
              onClick={removerInput}
            >
              Remover {screen.width < 600 ? '' : 'Campo'}
            </Button>
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
      <Flex marginTop={5} align={'center'} justify={'center'}>
        {jsonClients?.length ? (
          <Flex
            bgImg={`url(${require('../../assets/images/background.png')})`}
            borderRadius={10}
            padding={5}
            gap={6}
            margin={'auto auto'}
          >
            {Object.keys(jsonClients[0]).map((header) => (
              <Button
                key={header}
                value={header}
                onClick={(e) => adicionaInput(e.currentTarget.value)}
                colorScheme="teal"
                leftIcon={
                  <AiOutlinePlusCircle
                    color={'green'}
                    style={{ fontSize: '1.5em' }}
                  />
                }
              >
                {header}
              </Button>
            ))}
          </Flex>
        ) : (
          ''
        )}
      </Flex>
    </>
  )
}
