import express from 'express'
import tasksRoutes from './http/controllers/tasks/routes'
import 'dotenv/config'
import { sanitizeMiddleware } from './http/middlewares/sanitizeMiddleware'

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(sanitizeMiddleware)
  }

  routes() {
    this.app.use('/api/v1/tasks', tasksRoutes)
  }
}

export default new App().app
