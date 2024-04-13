import { acebase } from '@/lib/acebase'
import { UsersRepository } from '../users'
import { UserCreateInput } from '@/types/users'
import { randomUUID } from 'crypto'

export class AcebaseUsersRepository implements UsersRepository {
  async findById(id: string) {
    let task = null
    await acebase
      .query('users')
      .filter('id', '==', id)
      .get((snapshot) => {
        task = snapshot.getValues()[0]
      })
    return task
  }

  async findByEmail(email: string) {
    const tasks = await acebase
      .query('users')
      .filter('email', '==', email)
      .get()

    if (!tasks) return null

    const task = tasks.getValues()[0]

    return task
  }

  async create(data: UserCreateInput) {
    const taskId = randomUUID()
    const taskRef = acebase.ref(`users/${taskId}`)
    const newTask = {
      id: data.id ?? taskId,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      updated_at: new Date(),
    }
    await taskRef.set(newTask)

    return data
  }
}
