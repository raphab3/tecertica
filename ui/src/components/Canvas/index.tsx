/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef } from 'react'
import './styles.css'

export const Canvas = ({ shapes, setShapes, preview, setIsDown, isDown }: any) => {
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
    canvas.width = screen.width / 2.5
    canvas.height = screen.height / 1.9
    setWIDTH(canvas.width)
    setHEIGHT(canvas.height)
    // listen for mouse events
    canvas.onmousedown = myDown
    canvas.onmouseup = myUp
    canvas.onmousemove = myMove
    // an array of objects that define different shapes
    // define 2 rectangles
    // call to draw the scene
    draw()
    // draw a single rect
    function rect(r: any) {
      context.fillStyle = 'green'
      context.lineWidth = r.lineWidth
      context.strokeStyle = r.strokeStyle
      context.stroke()
      context.fillText(r.head, r.x, r.y)
      context.fillRect(r.x, r.y, r.width, r.height)
    }
    // clear the canvas
    // function clear() {
    //   context.clearRect(0, 0, WIDTH, HEIGHT)
    // }

    // function changeColor(){

    // }

    // redraw the scene
    function draw() {
      // clear()
      // redraw each shape in the shapes[] array
      for (let i = 0; i < shapes.length; i++) {
        rect(shapes[i])
      }
    }

    // handle mousedown events
    function myDown(e: any) {
      // tell the browser we're handling this mouse event
      // get the current mouse position
      const mx = e.clientX - offsetX
      const my = e.clientY - offsetY
      // test each shape to see if mouse is inside
      setDragok(false)
      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i]
        if (mx > s.x && mx < s.x + s.width && my > s.y && my < s.y + s.height) {
          setDragok(true)
          setIsDown(s.index)
          const shapesForChanged = [...shapes]
          shapesForChanged[i].isDragging = true
          setShapes(shapesForChanged)
        }
      }
      // save the current mouse position
      setStartX(mx)
      setStartY(my)
    }

    // handle mouseup events
    function myUp(e: any) {
      // tell the browser we're handling this mouse event
      // clear all the dragging flags
      setDragok(false)
      for (let i = 0; i < shapes.length; i++) {
        const shapesForChanged = [...shapes]
        shapesForChanged[i].isDragging = false
        setShapes(shapesForChanged)
      }
    }
    // handle mouse moves
    function myMove(e: any) {
      // if we're dragging anything...
      if (dragok) {
        // tell the browser we're handling this mouse event
        // get the current mouse position
        const mx = (e.clientX - offsetX)
        const my = (e.clientY - offsetY)
        // calculate the distance the mouse has moved
        // since the last mousemove
        const dx = mx - startX
        const dy = my - startY

        // move each rect that isDragging
        // by the distance the mouse has moved
        // since the last mousemove
        for (let i = 0; i < shapes.length; i++) {
          const s = shapes[i]
          if (s.isDragging) {
            if (dx < 0) {
              s.x += s.x > 0 ? dx : 1
            } else if (dx > 0) {
              s.x += s.x > (WIDTH - s.width) ? -1 : dx
            }

            if (dy < 0) {
              s.y += s.y > 0 ? dy : 1
            } else if (dy > 0) {
              s.y += s.y > (HEIGHT - s.height) ? -1 : dy
            }
          }
        }

        // redraw the scene with the new rect positions
        draw()

        // reset the starting mouse position for the next mousemove
        setStartX(mx)
        setStartY(my)
      }
    }
  }, [screen.width, screen.height, shapes, startX, startY, offsetX, offsetY])

  useEffect(() => {
    console.log('preview', preview)
    if (preview) {
      const stylesCanvas: any = document.getElementById('canvas')
      stylesCanvas.style.backgroundImage = `url(${preview})`
      stylesCanvas.style.width = WIDTH
      stylesCanvas.style.height = HEIGHT
    }
  }, [preview, WIDTH, HEIGHT])

  return (
    <>
      <canvas id='canvas' ref={canvasRef} />
    </>
  )
}
