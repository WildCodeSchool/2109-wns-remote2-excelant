import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { TaskType } from "../../_types/_taskTypes";

const DeleteTaskModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  task: TaskType;
}> = ({ open, handleClose, refetch, task }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [deleteTask] = useMutation(new GqlRequest("Task").delete("name"));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTask({
        variables: { input: { _id: task._id } },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      enqueueSnackbar(`The task has been deleted successfully!`, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      refetch();
      handleClose();
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        sx={{
          ...modalStyle,
          padding: "8px 24px",
          width: { xs: "95%", sm: "80%", md: "auto" },
        }}
      >
        <CardHeader
          title={`Are you sure you want to delete ${task.name}?`}
          sx={{ textAlign: "center" }}
        />
        <CardActions sx={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button onClick={handleDelete} disabled={loading} variant="contained">
            Delete
          </Button>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default DeleteTaskModal;
