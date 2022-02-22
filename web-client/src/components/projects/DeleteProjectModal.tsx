import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";

const DeleteProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  project: ProjectType;
}> = ({ open, handleClose, refetch, project }) => {
  const [loading, setLoading] = useState(false);

  const [deleteProject] = useMutation(new GqlRequest("Project").delete("name"));

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject({
        variables: { input: { _id: project._id } },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      refetch();
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...modalStyle, padding: "8px 24px" }}>
        <CardHeader
          title={`Are you sur you want to delete ${project.name}?`}
          sx={{ textAlign: "center" }}
        />
        <CardActions>
          <Button onClick={handleDelete} disabled={loading}>
            Delete
          </Button>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default DeleteProjectModal;
