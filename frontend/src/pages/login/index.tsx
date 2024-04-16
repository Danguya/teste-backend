/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Wrapper } from './style'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/Button'
import { Label } from '../../components/Label'
import Message from '../../components/Message'
import { LoginSchema } from '../../schemas/login'

type FormValues = z.infer<typeof LoginSchema>

export default function Login() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true)
      const { email, password } = data
      await signIn({ email, password })
      navigate('/')
    } catch (error: any) {
      const messageError =
        error.response?.data?.message ||
        'Por favor verifique a sua conexão com a internet.'
      if (messageError === 'Invalid credentials.') {
        setError(
          'Não foi possível encontrar uma conta que corresponda ao e-mail e à senha que você digitou.',
        )
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
        <h2>Faça login no Tasktop</h2>
        <Box
          width={'100%'}
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Label htmlFor="password">E-mail</Label>
          <TextField
            InputProps={{
              sx: { borderRadius: '9px' },
            }}
            className="TextField"
            placeholder="Seu endereço de e-mail"
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
          <Label htmlFor="password">Senha</Label>
          <TextField
            className="TextField"
            type="password"
            variant="outlined"
            placeholder="Sua senha secreta"
            InputProps={{
              sx: { borderRadius: '9px' },
            }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>
        <Button disabled={isLoading} type="submit">
          {isLoading ? 'Processando...' : 'Entrar'}
        </Button>
        <p>
          Não tem uma conta? <Link to={'/register'}>Inscreva-se</Link>
        </p>
      </Box>
      <Message show={!!error}>{error}</Message>
    </Wrapper>
  )
}
