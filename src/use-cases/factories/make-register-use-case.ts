import { AcebaseUsersRepository } from '@/repositories/acebase/acebase-users-repository'
import { RegisterUseCase } from '../user/register'

export function makeRegisterUseCase() {
  const aceUsersRepository = new AcebaseUsersRepository()
  const registerUseCase = new RegisterUseCase(aceUsersRepository)

  return registerUseCase
}
