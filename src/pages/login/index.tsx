/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from './style';
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const schema = z.object({
  email: z.string().email("E-mail não é válido!"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
})
type FormValues = z.infer<typeof schema>

export default function Login() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: zodResolver(schema)
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async(data: FormValues) => {
    try {
      const {email, password} = data
      await signIn({email, password})
      navigate('/')
    } catch (error: any) {
      const msg = error.response?.data?.message || "An error occurred"
      if(msg === "Invalid credentials."){
        setError("E-mail ou senha errada!")
      }
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
        <h2>Login no Sistema</h2>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          {...register("email")
          }
          error={!!errors.email}
          helperText={errors.email?.message}
          />

        <TextField
          id="outlined-basic"
          type='password'
          label="senha"
          variant="outlined"
          {...register("password")
          }
          error={!!errors.password}
          helperText={errors.password?.message}
          />
        {error && <p>{error}</p>}
        <Button type='submit' variant="outlined" style={{'height':'48px'}} >Entrar</Button>
         <p>Ir a página de <Link to={'/register'}>registro</Link></p>
      </Box>
    </Wrapper>
  )
}
