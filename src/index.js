import express, { urlencoded } from 'express'
import { StatusCodes } from 'http-status-codes'

import connectDB from './config/dbConfig.js'
import { PORT } from './config/serverConfig.js'

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: true }))

app.get('/api/v1/ping', (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'pong'
  })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
  connectDB()
})
