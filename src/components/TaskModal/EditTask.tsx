import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useEditTask } from "../../hooks/useEditTask";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type EditTaskModalProps = {
  open: boolean;
  handleClose: () => void;
  taskId: string;
  initialTitle: string;
  initialDescription: string;
};

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

function EditTaskModal({ open, handleClose, taskId, initialTitle, initialDescription }: EditTaskModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate } = useEditTask();

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  }, [initialTitle, initialDescription]);

  const handleCancel = () => {
    handleClose();
    reset();
  };

  const onSubmit = (data: { title: string, description: string, taskId: string }) => {
    mutate({taskId: taskId, title: data.title, description: data.description })
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Editar Tarefa</DialogTitle>
      <DialogContent>
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            {...register("title")}
            error={!!errors.title}
            helperText={errors.title ? "Informe um título." : ""}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? "Informe uma descrição." : ""}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

      <DialogActions>
        <Button type="button" onClick={handleCancel}>Cancelar</Button>
        <Button type="submit" color="primary">Salvar Alterações</Button>
      </DialogActions>
      </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTaskModal;
