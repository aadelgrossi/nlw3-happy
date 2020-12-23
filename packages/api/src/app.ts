import 'reflect-metadata'
import 'dotenv-flow/config'
import path from 'path'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import morgan from 'morgan'

import errorHandler from './errors/handler'
import routes from './routes'

import './database'
import './providers'

const app = express()
app.use(
  cors({
    credentials: true,
    origin: [process.env.WEB_URL, process.env.MOBILE_URL]
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
