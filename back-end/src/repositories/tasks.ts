export type Task = {
  id?: string
  title: string
  description: string
  isCompleted?: boolean
  created_at?: Date
  updated_at?: Date
}

export interface TasksRepository {
  findById(id: string): Promise<Task | null>
  findByTitle(title: string): Promise<Task | null>
  create(data: Task): Promise<Task>
  searchMany(query: string, page: number): Promise<Task[]>
  destroy(id: string): Promise<void>
  save(task: Task): Promise<Task>
  findAll(page: number, pageSize: number): Promise<Task[]>
}
