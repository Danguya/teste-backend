import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from '../../utils/token'
import { authConfig } from '@/config/auth'
import { TokenExpiredError } from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Authorization token missing.', code: 'token.missed' })
  }

  const [, token] = authHeader.split(' ')

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Token missing in authorization header.' })
  }

  const { secret_access_token } = authConfig

  try {
    const decoded = await verifyAccessToken(
      token,
      secret_access_token as string,
    )

    if (!decoded) {
      return res
        .status(401)
        .json({ error: 'Invalid token.', code: 'token.invalid' })
    }

    req.userId = decoded.userId
    return next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ error: 'Token has expired.', code: 'token.expired' })
    }

    return res.status(500).json({ error: 'Token verification failed.' })
  }
}
