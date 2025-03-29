import express from "express"
import dotenv from "dotenv"

import authRoutes from './routes/auth.routes.js'
import connectToMongoDB from "./db/connectToMongoDb.js"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/auth', authRoutes)

app.listen(PORT,()=>{
    console.log(`server running at : ${PORT}`)
    connectToMongoDB()  
})