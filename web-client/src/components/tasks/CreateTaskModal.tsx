import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import React, { useState, useEffect } from "react";
import moment from 'moment';
import { Formik, Form } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import { ProjectType } from "../../_types/_projectTypes";

interface CreateTaskInput {
  name: string;
  project: {
    _id: string;
  }
  status: string;
  assigne: string;
  dueDate: moment.Moment;
}

const defaultValues: CreateTaskInput = {
  name: "",
  project: {
    "_id": "",
  },
  status: "",
  assigne: "",
  dueDate: moment(),
};

const CreateTaskModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const { data, loading } = useQuery(
    new GqlRequest("Project").get("_id, name")
  );
  
  useEffect(() => {
    if (data) setProjects(data.findAllProjects);
  }, [data]);
  
  const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        name
        project {
          _id
        }
        status
        assigne
        dueDate
      }
    }
  `;
  const [createTask] = useMutation(CREATE_TASK);

  const onSubmit = (values: CreateTaskInput) => {
    setLoading(true);
    try {
      createTask({ variables: { input: values } });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...modalStyle, padding: "8px 24px" }}>
        <CardHeader title="Create a new task" sx={{ textAlign: "center" }} />
        <CardContent>
          {open && (
            <Formik
              initialValues={defaultValues}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      label="Name"
                      size="small"
                    />
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <FormControl sx={{ flexGrow: 1 }} size="small">
                        <InputLabel id="projects-label">
                          Select a project
                        </InputLabel>
                        <Select
                          name="project['_id']"
                          labelId="projects-label"
                          label="Select a project"
                          value={values.project._id  ?? " "}
                          onChange={handleChange}
                        >
                          {!(loading) && projects.map((project: Partial<ProjectType>) => (
                            <MenuItem key={project._id} value={project._id}>{project.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ flexGrow: 1 }} size="small">
                        <InputLabel id="task-status-label">
                          Task status
                        </InputLabel>
                        <Select
                          name="status"
                          labelId="task-status-label"
                          label="Task status"
                          onChange={handleChange}
                          value={values.status}
                        >
                          <MenuItem value="ongoing">En cours</MenuItem>
                          <MenuItem value="done">Terminé</MenuItem>
                          <MenuItem value="archived">Archivé</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <TextField
                        name="assigne"
                        value={values.assigne}
                        onChange={handleChange}
                        label="Assigne"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <DatePicker
                        label="Due Date"
                        inputFormat="DD/MM/YYYY"
                        minDate={moment()}
                        value={values.dueDate}
                        onChange={(value): void => {
                          setFieldValue("dueDate", value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            // eslint-disable-next-line
                            {...params}
                            name="dueDate"
                            size="small"
                            sx={{ flexGrow: 1 }}
                          />
                        )}
                      />
                    </Box>
                    {/**
                     * The description field
                     * Disabled because actually not supported
                     */}
                    <TextField
                      name="description"
                      value=""
                      onChange={handleChange}
                      label="Description"
                      size="small"
                      multiline
                      minRows={5}
                      disabled
                    />
                    <Box display="flex" justifyContent="space-evenly">
                      <Button
                        disabled={isLoading}
                        variant="contained"
                        onClick={() => onSubmit(values)}
                        sx={{ width: "128px" }}
                      >
                        Create
                        {isLoading && (
                          <CircularProgress
                            style={{
                              width: 20,
                              height: 20,
                              marginLeft: "10px",
                            }}
                          />
                        )}
                      </Button>
                      <Button
                        variant="outlined"
                        disabled={isLoading}
                        onClick={handleClose}
                        color="error"
                        sx={{ width: "128px" }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </CardContent>
      </Card>
    </Modal>
  );
};

export default CreateTaskModal;
