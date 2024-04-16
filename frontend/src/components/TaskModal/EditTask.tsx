import {
  Box,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useEditTask } from '../../hooks/useEditTask'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TaskSchema } from '../../schemas/task'
import { Label } from '../Label'
import { Button } from '../Button'
import { Dialog, DialogActions } from './style'
import Checkbox from '@mui/material/Checkbox'

type EditTaskModalProps = {
  open: boolean
  handleClose: () => void
  taskId: string
  initialTitle: string
  initialDescription: string
  initialIsCompleted: boolean
}

function EditTaskModal({
  open,
  handleClose,
  taskId,
  initialTitle,
  initialDescription,
  initialIsCompleted,
}: EditTaskModalProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [isCompleted, setIsCompleted] = useState(initialIsCompleted)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(TaskSchema),
  })
  const { mutate } = useEditTask()

  useEffect(() => {
    setTitle(initialTitle)
    setDescription(initialDescription)
    setIsCompleted(initialIsCompleted)
  }, [initialTitle, initialDescription, initialIsCompleted])

  const handleCancel = () => {
    handleClose()
    reset()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompleted(event.target.checked)
    alert(isCompleted)
  }

  const onSubmit = (data: {
    title: string
    description: string
    isCompleted: boolean
    taskId: string
  }) => {
    mutate({
      taskId,
      title: data.title,
      description: data.description,
      isCompleted,
    })

    handleClose()
    reset()
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Editar Tarefa</DialogTitle>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              Salvar
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

export default EditTaskModal
