import 'dotenv/config'

export const authConfig = {
  secret_access_token: process.env.SECRET_ACCESS_TOKEN,
  secret_access_token_expires_in: process.env.SECRET_ACCESS_TOKEN_EXPIRES,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  secret_refresh_token_expires_in: process.env.SECRET_REFRESH_TOKEN_EXPIRES,
}
