import express, { Application, Request, Response, NextFunction } from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { appConfig } from '../config/index.js'
import { errorHandler } from './middlewares/error.js'
import { AppError } from '../types/error.js'

const app: Application = express()

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowed = appConfig.CORS_ORIGINS.split(',')
    if (!origin || allowed.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
}

// Middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(cookieParser())

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Catch-all route for 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Route not found', 404))
})

// Error-handling middleware
app.use(errorHandler)

export default app
