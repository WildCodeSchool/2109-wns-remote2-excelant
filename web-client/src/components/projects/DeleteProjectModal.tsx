import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";
import { useSnackbar } from "notistack";

const DeleteProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  project: ProjectType;
}> = ({ open, handleClose, refetch, project }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [deleteProject] = useMutation(new GqlRequest("Project").delete("name"));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject({
        variables: { input: { _id: project._id } },
      });
      enqueueSnackbar(`The project ${project.name} has been deleted successfully!`, {
        variant: "error",
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
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
          title={`Are you sur you want to delete ${project.name}?`}
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

export default DeleteProjectModal;
