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
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Formik, Form } from "formik";
import { gql, useMutation, useQuery } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";
import { ProjectType } from "../../_types/_projectTypes";
import GqlRequest from "../../_graphql/GqlRequest";

interface CreateTaskInput {
  name: string;
  project: {
    _id: string;
  };
  status: string;
  assigne: { _id: string };
  dueDate: moment.Moment;
  description: string;
}

const defaultValues: CreateTaskInput = {
  name: "",
  project: {
    _id: "",
  },
  status: "",
  assigne: { _id: "" },
  dueDate: moment(),
  description: "",
};

const CreateTaskModal: React.FC<{
  projects: { _id: string; _name: string }[];
  open: boolean;
  handleClose: () => void;
}> = ({ projects, open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<string[]>([]);
  const [users, setUsers] = useState<{ _id: string; name: string }[]>([]);
  const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        name
        project {
          _id
        }
        status
        assigne {
          _id
          name
        }
        dueDate
        description
      }
    }
  `;
  const [createTask, { loading }] = useMutation(CREATE_TASK);
  const { data, loading: userLoading } = useQuery(
    new GqlRequest("User").get("_id, name")
  );

  const checkInput = (values: CreateTaskInput) => {
    const newErrors: string[] = [];
    if (!values.name) {
      newErrors.push("no_name");
    }
    if (!values.project._id) {
      newErrors.push("no_project");
    } else if (
      !projects.filter((project) => project._id === values.project._id)
    ) {
      newErrors.push("no_project");
    }
    if (!values.status) {
      newErrors.push("no_status");
    } else if (!["ongoing", "done", "archived"].includes(values.status)) {
      newErrors.push("no_status");
    }
    if (!values.assigne._id) {
      newErrors.push("no_assigne");
    }
    setErrors(newErrors);
    return newErrors;
  };

  const onSubmit = async (values: CreateTaskInput) => {
    try {
      if (checkInput(values).length > 0) {
        throw new Error("Invalid Inputs");
      }
      const res = await createTask({ variables: { input: values } });
      if (res) {
        enqueueSnackbar("Your task has been created successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setErrors([]);
        handleClose();
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (data?.findAllUsers) {
      setUsers(data.findAllUsers);
    }
  }, [data]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setErrors([]);
        handleClose();
      }}
    >
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
                      error={errors.includes("no_name")}
                      helperText={
                        errors.includes("no_name") && "Please enter a name"
                      }
                    />
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <FormControl sx={{ flexGrow: 1 }} size="small">
                        <InputLabel
                          id="projects-label"
                          error={errors.includes("no_project")}
                        >
                          Select a project
                        </InputLabel>
                        <Select
                          name="project['_id']"
                          labelId="projects-label"
                          label="Select a project"
                          value={values.project._id ?? " "}
                          onChange={handleChange}
                          error={errors.includes("no_project")}
                        >
                          {projects &&
                            projects.map((project: Partial<ProjectType>) => (
                              <MenuItem key={project._id} value={project._id}>
                                {project.name}
                              </MenuItem>
                            ))}
                        </Select>
                        {errors.includes("no_project") && (
                          <FormHelperText error>
                            Please select a valid project
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl sx={{ flexGrow: 1 }} size="small">
                        <InputLabel
                          id="task-status-label"
                          error={errors.includes("no_status")}
                        >
                          Task status
                        </InputLabel>
                        <Select
                          name="status"
                          labelId="task-status-label"
                          label="Task status"
                          onChange={handleChange}
                          value={values.status}
                          error={errors.includes("no_status")}
                        >
                          <MenuItem value="ongoing">En cours</MenuItem>
                          <MenuItem value="done">Terminé</MenuItem>
                          <MenuItem value="archived">Archivé</MenuItem>
                        </Select>
                        {errors.includes("no_status") && (
                          <FormHelperText error>
                            Please select a valid status
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <FormControl sx={{ flexGrow: 1 }} size="small">
                        <InputLabel
                          id="assigne-label"
                          error={errors.includes("no_status")}
                        >
                          Assigne
                        </InputLabel>
                        <Select
                          name="assigne['_id']"
                          labelId="assigne-label"
                          label="Assigne"
                          onChange={handleChange}
                          value={values.assigne._id}
                          error={errors.includes("no_status")}
                        >
                          {userLoading &&
                            users.map((user: { _id: string; name: string }) => (
                              <MenuItem value={user._id}>{user.name}</MenuItem>
                            ))}
                        </Select>
                        {errors.includes("no_status") && (
                          <FormHelperText error>
                            Please select a valid assigned user
                          </FormHelperText>
                        )}
                      </FormControl>
                      {/* <TextField
                        name="assigne"
                        value={values.assigne}
                        onChange={handleChange}
                        label="Assigne"
                        size="small"
                        sx={{ flexGrow: 1 }}
                        error={errors.includes("no_assigne")}
                        helperText={
                          errors.includes("no_assigne") &&
                          "Please enter a assigned user"
                        }
                      /> */}
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
                        onClick={() => {
                          setErrors([]);
                          handleClose();
                        }}
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
