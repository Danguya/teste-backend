import { randomUUID } from 'crypto'
import { Task, TasksRepository } from '../tasks'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async findAll(page: number = 1, pageSize: number = 20): Promise<Task[]> {
    const startIndex = (page - 1) * pageSize
    return this.items.slice(startIndex, startIndex + pageSize)
  }

  async create(data: Task) {
    const task = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      userId: data.userId,
      completed: data.isCompleted ?? false,
      created_at: new Date(),
    }
    this.items.push(task)
    return task
  }

  async findById(id: string) {
    const task = this.items.find((item) => item.id === id)
    if (!task) {
      return null
    }
    return task
  }

  async findByTitle(title: string) {
    const task = this.items.find((item) => item.title === title)
    if (!task) {
      return null
    }
    return task
  }

  async searchMany(query: string, page: number) {
    const lowerCaseQuery = query.toLowerCase()
    return this.items
      .filter((item) => item.title.toLowerCase().includes(lowerCaseQuery))
      .slice((page - 1) * 20, page * 20)
  }

  async destroy(id: string) {
    const index = this.items.findIndex((item) => item.id === id)
    this.items.splice(index, 1)
  }

  async save(task: Task) {
    const taskInIndex = this.items.findIndex((item) => item.id === task.id)

    if (taskInIndex >= 0) {
      this.items[taskInIndex] = task
    }
    return task
  }
}
