import express from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import pool from './database/database.js'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routes
import authRoute from './routes/auth.routes.js'
import userRoute from './routes/user.routes.js'

const PORT = 4000

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.get('/test', (req, res) => {
    res.send("Nginx is working and this is the /test endpoint")
})

app.use('/', authRoute)
app.use('/', userRoute)

app.listen(PORT, () => {
    console.log("server is running on port", PORT);
})

export { app }