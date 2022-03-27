import app from './app'
const http = require('http')
const PORT = process.env.PORT || 9000

// Server
http.createServer(app).listen(`${PORT}`, () => {
  console.log(
    `🔥 Server started on port => ${PORT} 
  \n - Swagger documentation: ${process.env.HOST}:${PORT}/doc
  \n - Unitary tests: ${process.env.HOST}:${PORT}/tests
  \n`
  )
})

process.on('SIGINT', () => {
  http.finally()
  console.log('Server closed')
})
