import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskSchema } from '../../schemas/task'
import { Label } from '../Label'
import { Button } from '../Button'
import { Dialog, DialogActions } from './style'
import Checkbox from '@mui/material/Checkbox'
import { useAddTask } from '../../hooks/useAddTask'
import {
  Box,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'

type AddTaskModalProps = {
  open: boolean
  handleClose: () => void
}

function AddTaskModal({ open, handleClose }: AddTaskModalProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TaskSchema),
  })
  const { mutate } = useAddTask()

  const onSubmit = (data: {
    title: string
    description: string
    isCompleted: boolean
  }) => {
    mutate(data)
    handleClose()
    reset()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked)
  }
  const handleCancel = () => {
    handleClose()
    reset()
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Criar Tarefa</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            width={'100%'}
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <Label
              sx={{
                fontSize: '14px',
                fontWeight: '400',
              }}
              htmlFor="title"
            >
              Novo título
            </Label>
            <TextField
              InputProps={{
                sx: { borderRadius: '8px' },
              }}
              className="TextField"
              placeholder="Novo título"
              variant="outlined"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title ? 'Informe um título.' : ''}
            />
          </Box>
          <Box
            width={'100%'}
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <Label
              sx={{
                fontSize: '14px',
                fontWeight: '400',
              }}
              htmlFor="title"
            >
              Nova descrição
            </Label>
            <TextField
              InputProps={{
                sx: { borderRadius: '8px' },
              }}
              className="TextField"
              placeholder="Novo título"
              variant="outlined"
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description ? 'Informe uma descrição.' : ''}
            />
          </Box>
          <Box
            width={'100%'}
            sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isCompleted || false}
                  onChange={handleChange}
                  name="isCompleted"
                />
              }
              label="Marcar tarefa como terminada"
            />
          </Box>

          <DialogActions>
            <Button type="submit" color="primary">
              Criar tarefa
            </Button>
            <Button
              type="button"
              className="button_close"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskModal
