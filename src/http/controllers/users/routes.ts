import { Router } from 'express'
import { authenticate } from './authenticate'
import { register } from './register'
import { profile } from './profile'
import authMiddleware from '@/http/middlewares/auth'

const router = Router()

router.post('/', register)
router.post('/sessions', authenticate)
// router.patch('/token/refresh', refresh)
// Authenticated
router.get('/me', authMiddleware, profile)

export default router
