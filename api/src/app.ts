import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'
import routes from './routes'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import './database'
import errorHandler from './errors/handler'
import cookieParser from 'cookie-parser'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000'
  })
)
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
  '/uploads',
  express.static(path.join(__dirname, '..', 'tmp', 'uploads'))
)
app.use(routes)
app.use(errorHandler)

export default app
