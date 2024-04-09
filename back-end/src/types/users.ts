export type User = {
  id?: string
  name: string
  email: string
  password_hash: string
}

export type UserCreateInput = {
  name: string
  email: string
  password_hash: string
}
