import 'dotenv/config'

const mongodbConfigEnv = {
  db_host: process.env.MONGO_HOST,
  db_name: process.env.MONGO_NAME,
  db_port: process.env.MONGO_PORT,
  db_user: process.env.MONGO_USER,
  db_password: process.env.MONGO_PASSWORD
}

const mongoDbURI = `mongodb://${mongodbConfigEnv.db_user}:${mongodbConfigEnv.db_password}@localhost:${mongodbConfigEnv.db_port}/${mongodbConfigEnv.db_name}?authSource=admin`

export const mongodbConfig = { mongoDbURI }
