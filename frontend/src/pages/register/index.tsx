import { Box, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Wrapper } from './style'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { API } from '../../services/axios'
import { useState } from 'react'
import { Label } from '../../components/Label'
import Message from '../../components/Message'
import { Button } from '../../components/Button'

const schema = z.object({
  name: z.string().min(4, 'O nome deve ter no mínimo 4 caracteres.'),
  email: z.string().email('E-mail não é válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})
type FormValues = z.infer<typeof schema>

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      await API.post('/users', data)
      navigate('/login')
    } catch (error: any) {
      const msg = error.response?.data?.message || 'An error occurred'
      if (msg === 'E-mail already exists.') {
        setError('O usuário não pode usar este e-mail, escolhe um outro.')
      } else {
        setError('Ocorreu um erro ao fazer cadastro, tente novamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Wrapper>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Inscreva-se no Tasktop</h2>
        <Box
          width={'100%'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Label htmlFor="name">Nome</Label>
          <TextField
            InputProps={{
              sx: { borderRadius: '9px' },
            }}
            className="TextField"
            placeholder="Seu nome"
            variant="outlined"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box
          width={'100%'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Label htmlFor="name">E-mail atual</Label>
          <TextField
            InputProps={{
              sx: { borderRadius: '9px' },
            }}
            className="TextField"
            placeholder="Seu endereço de e-mail atual"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>
        <Box
          width={'100%'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Label htmlFor="name">Nova Senha</Label>
          <TextField
            InputProps={{
              sx: { borderRadius: '9px' },
            }}
            type="password"
            className="TextField"
            placeholder="Crie uma senha secreta"
            variant="outlined"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Processando...' : 'Criar uma conta'}
        </Button>
        <p>
          já tem uma conta? <Link to={'/login'}>Faça o Login</Link>
        </p>
      </Box>
      <Message show={!!error}>{error}</Message>
    </Wrapper>
  )
}
