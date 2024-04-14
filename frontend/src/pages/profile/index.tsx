import { DataGrid, GridCheckCircleIcon, GridColDef, GridDeleteForeverIcon } from '@mui/x-data-grid';
import Header from '../../components/Header/header';
import { useUserInformation } from '../../hooks/useUserInformation';
import { useTasks } from '../../hooks/useTasks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useDeleteTask } from '../../hooks/useUpdateTask';
import EditTaskModal from '../../components/TaskModal/EditTask';


export default function Profile() {
  const [selectedTask, setSelectedTask] = useState<{ taskId: string, open: boolean }>({
    taskId: "",
    open: false
  });
  const [editTask, setEditTask] = useState<{ taskId: string, open: boolean }>({
    taskId: "",
    open: false
  });
  const { data: userData } = useUserInformation();
  const { mutate: deleteTask } = useDeleteTask();
  const { data: tasks } = useTasks();

  const user = {
    username: userData?.user?.name,
    email: userData?.user?.email,
  }
  const handleMarkAsCompleted = (taskId:string) => {
    // Implement your logic to mark the task as completed
    return taskId
  };

  const handleUpdateTask = (taskId:string) => {
    setEditTask({
      open: true,
      taskId
    })
    return taskId

  };
  const handleCancelUpdateTask = () => {
    setEditTask({
      open: false,
      taskId: ""
    })
  };

  const handleDeleteTask = (taskId:string) => {
    setSelectedTask({ taskId, open: true });
  };

  const handleConfirmDelete = () => {
    deleteTask(selectedTask.taskId)
    setSelectedTask({taskId:"",open:false})
  };

  const handleCancelDelete = () => {
    setSelectedTask({ taskId: "", open: false });
  };

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Título', width: 400 },
    { field: 'description', headerName: 'Descrição', width: 200 },
    {
      field: 'isCompleted',
      headerName: 'Estado',
      type: 'boolean',
      width: 230,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 530,

      renderCell: (params) => (
        <div>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleMarkAsCompleted(params.row.id)}
            startIcon={<GridCheckCircleIcon />}
          />
          <Button
            variant="text"
            color="secondary"
            onClick={() => handleUpdateTask(params.row.id)}
            startIcon={<UpdateIcon />}
          />
          <Button
            variant="text"
            color="error"
            onClick={() => handleDeleteTask(params.row.id)}
            startIcon={<GridDeleteForeverIcon />}
          />
        </div>
      ),
    },
  ];


  return (
    <>
      <Header user={{
        email: user.email,
        username: user.username
      }} />
      <div style={{ height: '500px', width: '100%' }}>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 20 },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </div>
    <Dialog open={selectedTask.open} onClose={handleCancelDelete}>
      <DialogTitle>Apagar Tarefa</DialogTitle>
      <DialogContent>
        Tem a certeza que pretende Apagar esta tarefa?
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete}>Cancelar</Button>
        <Button onClick={handleConfirmDelete} color="error">Apagar</Button>
      </DialogActions>
    </Dialog>

    <EditTaskModal
      handleClose={handleCancelUpdateTask}
      open={editTask.open}
      taskId={editTask.taskId}
      initialTitle={tasks?.find(task => task.id === editTask.taskId)?.title || ""}
      initialDescription={tasks?.find(task => task.id === editTask.taskId)?.description || ""}
    />

    </>
  )
}



