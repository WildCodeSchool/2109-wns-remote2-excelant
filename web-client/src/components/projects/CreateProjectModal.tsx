import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { gql, useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";

type Status = string

interface CreateProjectInput {
  name: string;
  status: Status;
  projectManager: string;
  dueDate: string;
}

const defaultValues: CreateProjectInput = {
  name: "",
  status: "",
  projectManager: "",
  dueDate: ""
};

const CreateProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const CREATE_PROJECT = gql`
    mutation createProject($input: CreateProjectInput!) {
      createProject(input: $input) {
        name
        status
        projectManager
        dueDate
      }
    }
  `;
  const [createProject] = useMutation(CREATE_PROJECT);

  const onSubmit = (values: CreateProjectInput) => {
    setLoading(true);
    try {
      createProject({ variables: { input: values } });
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={{ ...modalStyle, padding: "8px 24px" }}>
        <CardHeader title="Create a new project" sx={{ textAlign: "center" }} />
        <CardContent>
          {open && (
            <Formik
              initialValues={defaultValues}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <TextField
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        label="Project name"
                        sx={{ flexGrow: 1 }}
                      />
                      <FormControl sx={{ flexGrow: 1 }}>
                        <InputLabel id="status-label">Project status</InputLabel>
                        <Select
                          name="status" 
                          labelId="status-label"
                          label="Project status"
                          onChange={handleChange}
                          value={values.status}
                        >
                          <MenuItem value={"ongoing"}>En cours</MenuItem>
                          <MenuItem value={"done"}>Terminé</MenuItem>
                          <MenuItem value={"archived"}>Archivé</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box
                      display="flex"
                      sx={{ flexDirection: { xs: "column", md: "row" } }}
                      gap={1}
                    >
                      <TextField
                        name="projectManager"
                        value={values.projectManager}
                        onChange={handleChange}
                        label="Project Manager"
                        sx={{ flexGrow: 1 }}
                      />
                      <TextField
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                        label="Due date"
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                    <TextField
                      name="description"
                      value={""}
                      onChange={handleChange}
                      label="Description"
                      multiline={true}
                      minRows={5}
                      disabled
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
                              marginLeft: "10px"
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

export default CreateProjectModal;
