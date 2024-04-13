import { acebase } from '@/lib/acebase'
import { Task, TasksRepository } from '../tasks'
import { randomUUID } from 'crypto'

export class AcebaseTasksRepository implements TasksRepository {
  async findById(id: string) {
    let task = null
    await acebase
      .query('tasks')
      .filter('id', '==', id)
      .get((snapshot) => {
        task = snapshot.getValues()[0]
      })
    return task
  }

  async create(data: Task) {
    const taskId = randomUUID()
    const taskRef = acebase.ref(`tasks/${taskId}`)
    const newTask = {
      id: data.id ?? taskId,
      title: data.title,
      description: data.description,
      isCompleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    }
    await taskRef.set(newTask)

    return data
  }

  async findAll(page: number = 1, pageSize: number = 20) {
    const startIndex = (page - 1) * pageSize

    const tasks = await acebase
      .query('tasks')
      .take(pageSize)
      .skip(startIndex)
      .sort('updated_at', false)
      .get()

    return tasks.getValues()
  }

  async findByTitle(title: string) {
    const tasks = await acebase
      .query('tasks')
      .filter('title', '==', title)
      .get()

    if (!tasks) return null

    const task = tasks.getValues()[0]

    return task
  }

  async searchMany(query: string, page: number) {
    const pageSize = 20
    const startIndex = (page - 1) * pageSize
    console.log(query)
    const tasks = await acebase
      .query('tasks')
      .filter('title', 'like', `${query.toString()}*`)
      .take(pageSize)
      .skip(startIndex)
      .sort('updated_at', false)
      .get()

    return tasks.getValues()
  }

  async destroy(taskId: string) {
    await acebase.ref(`tasks/${taskId}`).remove()
  }

  async save(task: Task) {
    const ref = await acebase.ref(`tasks/${task.id}`).update(task)

    const snapshot = await ref.get()
    const updatedTask = snapshot.val()
    return updatedTask
  }
}
