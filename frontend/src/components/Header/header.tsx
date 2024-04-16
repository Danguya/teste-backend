import { User, Wrapper } from './style'
import avatarImg from '../../assets/avatar.jpg'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import AddTaskModal from '../TaskModal/AddTask'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Button } from '../Button'

type UserTypes = {
  username: string
  email: string
}

type HeaderProps = {
  user: UserTypes
}
export default function Header({ user }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const [modalConfirmLogout, setModalConfirmLogout] = useState(false)

  const { signOut } = useAuth()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Wrapper>
      <div className="logo">
        <h3>Gestor De Tarefas</h3>
        <User>
          <div className="avatar">
            <img src={avatarImg} alt="" />
          </div>

          <div className="username">
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
        </User>
      </div>
      <div className="cta">
        <button className="add_task" onClick={handleOpen}>
          Adicionar Tarefa
        </button>
        <button onClick={() => setModalConfirmLogout(true)}>
          Terminar Sessão
        </button>
      </div>
      <AddTaskModal handleClose={handleClose} open={open} />
      <Dialog
        open={modalConfirmLogout}
        onClose={() => setModalConfirmLogout(false)}
      >
        <DialogTitle>Terminar Sessão</DialogTitle>
        <DialogContent>
          Tem a certeza que pretende terminar esta sessão?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalConfirmLogout(false)}>Não</Button>
          <Button onClick={signOut} color="error">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Wrapper>
  )
}
