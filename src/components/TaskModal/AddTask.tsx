import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddTask } from "../../hooks/useAddTask";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface FormValues {
  title: string;
  description: string;
  taskId: string;
}

type AddTaskModalProps = {
  open: boolean;
  handleClose: () => void;
};

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
});

function AddTaskModal({ open, handleClose }: AddTaskModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const { mutate } = useAddTask();

  const onSubmit: SubmitHandler<FormValues> = (data: { title: string, description: string }) => {
    mutate(data);
    handleClose();
    reset();
  };

  const handleCancel = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Nova Tarefa</DialogTitle>
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
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description ? "Informe uma descrição." : ""}
          />
          <DialogActions>
            <Button type="button" onClick={handleCancel}>Cancelar</Button>
            <Button type="submit" color="primary">Adicionar Tarefa</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
