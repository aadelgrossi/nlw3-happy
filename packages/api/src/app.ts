import 'reflect-metadata'
import 'dotenv/config'
import path from 'path'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'

import errorHandler from './errors/handler'
import routes from './routes'

import './providers'
import './database'

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
