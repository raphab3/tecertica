import React, { useEffect, useRef } from 'react'
import './styles.css'

export const Canvas = ({
  shapes,
  setShapes,
  preview,
  setIsDown,
  isDown
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
    canvas.width = screen.width / 2.5
    canvas.height = screen.height / 1.9
    setWIDTH(canvas.width)
    setHEIGHT(canvas.height)
    canvas.onmousedown = myDown
    canvas.onmouseup = myUp
    canvas.onmousemove = myMove
    draw()

    function rect(r: any) {
      context.beginPath()
      context.fillStyle = 'green'
      if (r.lineWidth) {
        context.lineWidth = r.lineWidth
        context.strokeStyle = r.strokeStyle
        context.strokeRect(r.x, r.y, r.width, r.height)
        context.fillText(r.head, r.x, r.y - 4)
      } else {
        context.fillText(r.head, r.x, r.y)
      }
      context.fillRect(r.x, r.y, r.width, r.height)
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
      if (s && ((mx < s.x && mx < s.x + s.width) || (mx > s.x && mx > s.x + s.width) || (my > s.y && my > s.y + s.height) || (my < s.y && my < s.y + s.height))) {
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
          }
        }

        draw()

        setStartX(mx)
        setStartY(my)
      }
    }
  }, [screen.width, isDown, screen.height, shapes, startX, startY, offsetX, offsetY])

  useEffect(() => {
    if (preview) {
      const stylesCanvas: any = document.getElementById('canvas')
      stylesCanvas.style.backgroundImage = `url(${preview})`
      stylesCanvas.style.width = WIDTH
      stylesCanvas.style.height = HEIGHT
    }
  }, [preview, WIDTH, HEIGHT])

  return (
    <>
      <canvas id="canvas" ref={canvasRef} />
    </>
  )
}
