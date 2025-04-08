import mongoose from 'mongoose'

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js'

export default async function connectDB() {
  try {
    let connection
    if (NODE_ENV === 'production') {
      connection = await mongoose.connect(PROD_DB_URL)
    } else if (NODE_ENV === 'developement') {
      connection = await mongoose.connect(DEV_DB_URL)
    }

    if (connection) {
      console.log(NODE_ENV + ' database conntected successfully!')
    }
  } catch (error) {
    console.log('Error Connecting the database!', error)
  }
}

