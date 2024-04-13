import { Router } from 'express'
import { createTaskRoute } from './create'
import { fetchTasksRoute } from './fetch'
import { updateTasksRoute } from './update'
import { getTasksRoute } from './getTask'
import { destroyTasksRoute } from './destroyTask'
import { searchTasksRoute } from './searchTask'

const router = Router()
router.post('/', createTaskRoute)
router.get('/', fetchTasksRoute)
router.get('/search', searchTasksRoute)
router.get('/:taskId', getTasksRoute)
router.put('/:taskId', updateTasksRoute)
router.delete('/:taskId', destroyTasksRoute)

export default router
