import 'dotenv/config'
import mongoose from 'mongoose'

import { mongodbConfig } from '@config/database/mongodb'

mongoose.connect(mongodbConfig.mongoDbURI).catch((error) => {
  console.log(
    "[MONGOOSE] ERROR: Couldn't connect to remote instance of MongoDB"
  )
  console.log(`[URL] ERROR: ${mongodbConfig.mongoDbURI}`)
  console.error(error)
})

mongoose.connection.on('connecting', () => {
  console.info('[MONGOOSE] Connecting...')
})

mongoose.connection.on('connected', () => {
  console.info('[MONGOOSE] Connected')
})
