import { authConfig } from '@/config/auth'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'

const { secret_access_token, secret_refresh_token } = authConfig

export const generateAccessToken = (userId: string) => {
  const accessToken = jwt.sign({ userId }, secret_access_token as string, {
    expiresIn: '1h',
  })
  return accessToken
}

export const generateRefreshToken = (userId: string) => {
  const refreshToken = jwt.sign({ userId }, secret_refresh_token as string, {
    expiresIn: '7d',
  })

  return refreshToken
}

export const verifyAccessToken = async (token: string, secret: string) => {
  try {
    const decoded = await promisify(jwt.verify)(token, secret)
    return decoded
  } catch (error) {
    return null
  }
}
