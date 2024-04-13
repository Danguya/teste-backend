import { User, UserCreateInput } from '@/types/users'

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateInput): Promise<User>
}