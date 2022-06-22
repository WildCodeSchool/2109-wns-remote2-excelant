import { Modal, Card, CardHeader, CardActions, Button } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import {useQuery, useMutation, gql} from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";
import Notification from "../../_utils/Notification";
import ProjectContext from "../../context/ProjectContext";
import {findAll} from "styled-components/test-utils";

const DeleteProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  project: ProjectType;
}> = ({ open, handleClose, refetch, project }) => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: "" ,type: "" });

  // const { data } = useQuery(
  //     new GqlRequest("Project").get(
  //         "_id, name, status, projectManager, dueDate"
  //     )
  // );
  const FIND_ALL_PROJECTS = gql`
    query {
      findAllProjects {
        name
        status
        projectManager
        dueDate
      }
    } 
  `;
  const { data } = useQuery(FIND_ALL_PROJECTS);
  console.log(data);

  const [deleteProject] = useMutation(new GqlRequest("Project").delete("name"), { refetchQueries: [
      {query: FIND_ALL_PROJECTS},
  ], awaitRefetchQueries: false});

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteProject({
        variables: { input: { _id: project._id } },
      });
      setNotify({ isOpen: true, message: `The project ${project.name} has been deleted successfully!`, type: "info" });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      // refetch();
      handleClose();
      setLoading(false);
    }
  };

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
      <Notification
          isOpen={notify.isOpen}
          message={notify.message}
          type="info"
          setNotify={setNotify}
      />
    </>
  );
};

export default DeleteProjectModal;
