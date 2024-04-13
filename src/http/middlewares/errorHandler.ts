// errorHandler.ts

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ message: 'Validation error.', issues: error.errors })
  } else {
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

export default errorHandler
