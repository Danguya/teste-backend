import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tasksRoutes from './http/controllers/tasks/routes'
import usersRoutes from './http/controllers/users/routes'
import { sanitizeMiddleware } from './http/middlewares/sanitizeMiddleware'
import errorHandler from './http/middlewares/errorHandler'

class App {
  public app: express.Application
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(sanitizeMiddleware)
    this.app.use(errorHandler)
    this.app.use(cors())
    this.app.options('*', cors())
  }

  routes() {
    this.app.use('/api/v1/users', usersRoutes)
    this.app.use('/api/v1/tasks', tasksRoutes)
  }
}

export default new App().app
