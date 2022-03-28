import app from './app'
const PORT = process.env.SERVER_PORT || 7000

// Server
app.listen(`${PORT}`, () => {
  console.log(
    `🔥 Server started on port => ${PORT} 
  \n - Swagger documentation: ${process.env.HOST}:${PORT}/doc
  \n - Unitary tests: ${process.env.HOST}:${PORT}/tests
  \n - Mongo express: ${process.env.HOST}:8081
  \n`
  )
})

process.on('SIGINT', () => {
  console.log('Server closed')
})
