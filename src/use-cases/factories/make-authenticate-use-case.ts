import { AuthenticateUseCase } from '../user/authenticate'
import { AcebaseUsersRepository } from '@/repositories/acebase/acebase-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new AcebaseUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
