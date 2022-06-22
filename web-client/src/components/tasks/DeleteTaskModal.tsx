import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { TaskType } from "../../_types/_taskTypes";
import Notification from "../../_utils/Notification";
import TaskContext from "../../context/TaskContext";

const DeleteTaskModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  task: TaskType;
}> = ({ open, handleClose, refetch, task }) => {
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: "" ,type: "" });
  const { tasks, setTasks } = useContext(TaskContext);
  console.log(tasks);

  const [deleteTask] = useMutation(new GqlRequest("Task").delete("name"));
  let result: any;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTask({
        variables: { input: { _id: task._id } },
      });
      if (result) {
        setNotify({isOpen: true, message: "Your task has been deleted successfully!", type: "info"});
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      refetch();
      handleClose();
      setLoading(false);
    }
  };

  // useEffect(() => {
  //     refetch();
  // }, [tasks])

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Card
            sx={{
              ...modalStyle,
              padding: "8px 24px",
              width: { xs: "95%", sm: "80%", md: "auto" },
            }}
        >
          <CardHeader
              title={`Are you sur you want to delete ${task.name}?`}
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
      <Notification
          isOpen={notify.isOpen}
          message={notify.message}
          type="info"
          setNotify={setNotify}
      />
    </>

  );
};

export default DeleteTaskModal;
