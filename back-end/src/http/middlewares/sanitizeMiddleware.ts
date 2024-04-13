import { NextFunction, Request, Response } from 'express'
import sqlString from 'sqlstring'
import xss from 'xss'

export function sanitizeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Sanitização contra SQL Injection
  for (const key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      req.query[key] = sqlString.escape(req.query[key]).replace(/'/g, '')
    }
  }
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = sqlString.escape(req.body[key]).replace(/'/g, '')
    }
  }

  // Sanitização contra XSS
  for (const key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      req.query[key] = xss(req.query[key])
    }
  }
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = xss(req.body[key])
    }
  }
  next()
}
