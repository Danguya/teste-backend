import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Wrapper } from './style';
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { API } from '../../services/axios';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(4, "O nome deve ter no mínimo 4 caracteres."),
  email: z.string().email("E-mail não é válido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres.")
})
type FormValues = z.infer<typeof schema>

export default function Register() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    resolver: zodResolver(schema)
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      await API.post('/users', data)
      navigate('/login')
    } catch (error: any) {
      setError("Ocorreu um erro ao fazer cadastro, tente novamente.")
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
          label="Nome"
          variant="outlined"
          {...register("name")
          }
          error={!!errors.name}
          helperText={errors.name?.message}
          />

        <TextField
          id="outlined-basic"
          label="e-mail"
          variant="outlined"
          {...register("email")
          }
          error={!!errors.email}
          helperText={errors.email?.message}
          />

        <TextField
          id="outlined-basic"
          label="senha"
          variant="outlined"
          {...register("password")
          }
          error={!!errors.password}
          helperText={errors.password?.message}
          />

          {error && <p>{error}</p>}

        <Button type='submit' variant="outlined" style={{'height':'48px'}} >Criar conta</Button>
         <p>Se já tem uma conta, faça o <Link to={'/login'}>login</Link></p>
      </Box>
    </Wrapper>
  )
}
