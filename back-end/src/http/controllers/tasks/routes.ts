import { Router } from 'express'
import { createTaskRoute } from './create'
import { fetchTasksRoute } from './fetch'
import { updateTasksRoute } from './update'
import { getTasksRoute } from './getTask'
import { destroyTasksRoute } from './destroyTask'
import { searchTasksRoute } from './searchTask'
import authMiddleware from '@/http/middlewares/auth'

const router = Router()
router.post('/', authMiddleware, createTaskRoute)
router.get('/', authMiddleware, fetchTasksRoute)
router.get('/search', authMiddleware, searchTasksRoute)
router.get('/:taskId', authMiddleware, getTasksRoute)
router.put('/:taskId', authMiddleware, updateTasksRoute)
router.delete('/:taskId', authMiddleware, destroyTasksRoute)

export default router
