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
import React from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import { gql, useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import { ProjectType } from "../../_types/_projectTypes";

interface CreateTaskInput {
  name: string;
  project: {
    _id: string;
  };
  status: string;
  assigne: string;
  dueDate: moment.Moment;
  description: string;
}

const defaultValues: CreateTaskInput = {
  name: "",
  project: {
    _id: "",
  },
  status: "",
  assigne: "",
  dueDate: moment(),
  description: "",
};

const CreateTaskModal: React.FC<{
  projects: Object[];
  open: boolean;
  handleClose: () => void;
}> = ({ projects, open, handleClose }) => {
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
        description
      }
    }
  `;
  const [createTask, { loading }] = useMutation(CREATE_TASK);

  const onSubmit = (values: CreateTaskInput) => {
    try {
      createTask({ variables: { input: values } });
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
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
                          value={values.project._id ?? " "}
                          onChange={handleChange}
                        >
                          {projects &&
                            projects.map((project: Partial<ProjectType>) => (
                              <MenuItem key={project._id} value={project._id}>
                                {project.name}
                              </MenuItem>
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
                    <TextField
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      label="Description"
                      size="small"
                      multiline
                      minRows={5}
                    />
                    <Box display="flex" justifyContent="space-evenly">
                      <Button
                        disabled={loading}
                        variant="contained"
                        onClick={() => onSubmit(values)}
                        sx={{ width: "128px" }}
                      >
                        Create
                        {loading && (
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
                        disabled={loading}
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
