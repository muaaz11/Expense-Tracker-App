import express from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import pool from './database/database.js'


const PORT = 4000

dotenv.config()
const app = express()
app.use(express.json())

// import Routes

import authRoute from './routes/auth.routes.js'

app.use('/api/v1/users', authRoute)

app.listen(PORT, (req, res) => {
    console.log("server is running on port", PORT);
})

export { app }