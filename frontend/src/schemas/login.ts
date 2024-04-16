import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email('E-mail não é válido!'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})
