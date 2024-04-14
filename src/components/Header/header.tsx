import { User, Wrapper } from "./style";
import avatarImg from '../../assets/avatar.jpg';
import { lazy, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const AddTaskModal = lazy(()=>import("../TaskModal/AddTask"))

type UserTypes = {
  username: string
  email: string
}

type HeaderProps = {
  user: UserTypes
}
export default function Header({user}:HeaderProps) {
  const [open, setOpen] = useState(false);

  const {signOut} = useAuth()


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



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
        <button onClick={signOut}>
          Terminar Sessão
        </button>
      </div>
      <AddTaskModal handleClose={handleClose} open={open} />
    </Wrapper>
  )
}
