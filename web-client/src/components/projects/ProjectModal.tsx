import { useMutation } from "@apollo/client";
import { DatePicker } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";
import { taskModalStyle } from "../../_utils/modalStyle";

const ProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  project: ProjectType;
  refetch: () => void;
}> = ({ open, handleClose, project, refetch }) => {
  const [modify, setModify] = useState<boolean>(false);
  const [modifiedProject, setModifiedProject] = useState<Partial<ProjectType>>({
    name: project.name,
    status: project.status,
    projectManager: project.projectManager,
    dueDate: project.dueDate,
  });

  const [updateProject] = useMutation(new GqlRequest("Project").update("name"));

  const handleModification = () => {
    setModifiedProject({
      name: project.name,
      status: project.status,
      projectManager: project.projectManager,
      dueDate: project.dueDate,
    });
    setModify(true);
  };

  const handleSubmit = () => {
    try {
      updateProject({
        variables: { id: project._id, input: modifiedProject },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      refetch();
      setModify(false);
    }
  };

  const setFieldValue = (
    key: "name" | "dueDate" | "status" | "projectManager",
    value: any
  ) => {
    const newProject = { ...modifiedProject };
    newProject[key] = value;
    setModifiedProject(newProject);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...taskModalStyle, padding: "24px 32px" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            {modify ? (
              <TextField
                type="text"
                value={modifiedProject.name}
                onChange={(event) => {
                  setFieldValue("name", event.target.value);
                }}
                sx={{ height: "56px", mb: 2 }}
              />
            ) : (
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  color: "primary.main",
                  mb: 2,
                }}
              >
                {project.name}
              </Typography>
            )}
            <Typography variant="body1" sx={{ mb: 4 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias
              architecto atque commodi corporis debitis deleniti deserunt
              dolorem doloremque eaque impedit, inventore laudantium libero
              magnam maxime nisi quo tempore voluptatibus.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "56px",
                m: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "primary.main",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Status :
              </Typography>
              {modify ? (
                <FormControl sx={{ flexGrow: 1 }}>
                  <Select
                    name="status"
                    labelId="status-label"
                    label="Project status"
                    onChange={(event) =>
                      setFieldValue("status", event.target.value)
                    }
                    value={modifiedProject.status}
                  >
                    <MenuItem value="ongoing">En cours</MenuItem>
                    <MenuItem value="done">Terminé</MenuItem>
                    <MenuItem value="archived">Archivé</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {project.status}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "56px",
                m: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "primary.main",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Project manager :
              </Typography>
              {modify ? (
                <TextField
                  type="text"
                  variant="outlined"
                  value={modifiedProject.projectManager}
                  onChange={(event) => {
                    setFieldValue("projectManager", event.target.value);
                  }}
                  sx={{ flexGrow: 1 }}
                />
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {project.projectManager}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                height: "56px",
                m: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  display: "inline",
                  fontWeight: "bold",
                  color: "primary.main",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Due date :
              </Typography>
              {modify ? (
                <DatePicker
                  label="Due Date"
                  inputFormat="DD/MM/YYYY"
                  minDate={moment()}
                  value={modifiedProject.dueDate}
                  onChange={(value) => {
                    setFieldValue("dueDate", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="dueDate"
                      sx={{ flexGrow: 1 }}
                    />
                  )}
                />
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {moment(project.dueDate).format("DD/MM/YYYY")}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 5,
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              {modify ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: "auto", mb: 5 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setModify(false)}
                    sx={{ mt: "auto", mb: 5 }}
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleModification}
                  sx={{ mt: "auto", mb: 5 }}
                >
                  Modify
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h3"
              sx={{ textAlign: "center", color: "primary.main" }}
            >
              Comments
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

export default ProjectModal;
