import React, { useEffect, useState } from "react";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client";
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
import { useSnackbar } from "notistack";
import GqlRequest from "../../_graphql/GqlRequest";
import CommentsList from "../comments/CommentList";
import { taskModalStyle } from "../../_utils/modalStyle";
import "./TaskModal.scss";
import { TaskType } from "../../_types/_taskTypes";
import { ProjectType } from "../../_types/_projectTypes";

const TaskModal: React.FC<{
  open: boolean;
  task: TaskType;
  refetch: () => void;
  handleClose: () => void;
}> = ({ open, task, handleClose, refetch }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [allProjects, setAllProjects] = useState([]);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const [getAllProjects, { loading: areProjectsLoading }] = useLazyQuery(
    new GqlRequest("Project").get("_id, name"),
    {
      onCompleted: (data) => {
        setAllProjects(data.findAllProjects);
      },
    }
  );

  const [modify, setModify] = useState<boolean>(false);
  const [modifiedTask, setModifiedTask] = useState({
    name: task.name,
    status: task.status,
    assigne: { _id: task.assigne._id },
    dueDate: task.dueDate,
    project: {
      _id: task.project._id || "",
    },
    description: task.description,
  });

  const [updateTask] = useMutation(new GqlRequest("Task").update("name"));
  const { data } = useQuery(new GqlRequest("User").get("_id, name"));

  const handleModification = () => {
    getAllProjects();
    setModify(true);
  };

  const handleSubmit = () => {
    try {
      updateTask({
        variables: { id: task._id, input: modifiedTask },
      });
      enqueueSnackbar(`The task ${task.name} has been modified successfully!`, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
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
    key: "name" | "dueDate" | "status" | "assigne" | "project" | "description",
    value: unknown
  ) => {
    setModifiedTask({
      ...modifiedTask,
      [key]: value,
    });
  };

  useEffect(() => {
    if (data?.findAllUsers) {
      setUsers(data.findAllUsers);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...taskModalStyle, padding: "8px 24px" }}>
        <Grid container>
          <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
            {modify ? (
              <TextField
                name="name"
                type="text"
                value={modifiedTask.name}
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
                  color: "rgba(125, 128, 218)",
                  mb: 2,
                }}
              >
                {task.name}
              </Typography>
            )}
            {modify ? (
              <TextField
                type="text"
                variant="outlined"
                value={modifiedTask.description}
                onChange={(event) => {
                  setFieldValue("description", event.target.value);
                }}
                sx={{ flexGrow: 1 }}
                multiline
                minRows={5}
              />
            ) : (
              <Typography variant="body1" sx={{ mb: 4 }}>
                {task.description}
              </Typography>
            )}
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
                  color: "rgba(125, 128, 218)",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Project :
              </Typography>
              {modify && !areProjectsLoading ? (
                <FormControl sx={{ flexGrow: 1 }}>
                  <Select
                    name="project"
                    labelId="allProjects-label"
                    label="Project status"
                    value={modifiedTask.project._id || " "}
                    onChange={(event) =>
                      setFieldValue("project", { _id: event.target.value })
                    }
                  >
                    {allProjects.map((project: Partial<ProjectType>) => (
                      <MenuItem key={project._id} value={project._id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {task.project.name}
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
                  color: "rgba(125, 128, 218)",
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
                    label="Task status"
                    onChange={(event) =>
                      setFieldValue("status", event.target.value)
                    }
                    value={modifiedTask.status}
                  >
                    <MenuItem value="ongoing">En cours</MenuItem>
                    <MenuItem value="done">Terminé</MenuItem>
                    <MenuItem value="archived">Archivé</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {task.status}
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
                  color: "rgba(125, 128, 218)",
                  textAlign: "right",
                  width: "150px",
                }}
              >
                Assigne:
              </Typography>
              {modify ? (
                <FormControl sx={{ flexGrow: 1 }} size="small">
                  <Select
                    name="assigne['_id']"
                    labelId="assigne-label"
                    label="Assigne"
                    onChange={(event) =>
                      setFieldValue("assigne", event.target.value)
                    }
                    value={modifiedTask.assigne._id}
                  >
                    {users.map((user: { _id: string; name: string }) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <Typography variant="body1" sx={{ display: "inline" }}>
                  {task.assigne.name}
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
                  color: "rgba(125, 128, 218)",
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
                  value={modifiedTask.dueDate}
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
                  {moment(task.dueDate).format("DD/MM/YYYY")}
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
          <CommentsList task={task} />
        </Grid>
      </Card>
    </Modal>
  );
};

export default TaskModal;
