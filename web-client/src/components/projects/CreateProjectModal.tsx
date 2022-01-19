import {
    Modal,
    Card,
    CardHeader,
    CardContent,
    Button,
    CircularProgress,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Formik, Form } from "formik";
  import { gql, useMutation } from "@apollo/client";
  
  interface CreateProjectInput {
    name: string;
    status: string;
    projectManager: string;
    dueDate: string;
  }
  
  const defaultValues: CreateProjectInput = {
    name: "",
    status: "",
    projectManager: "",
    dueDate: "",
  };
  
  const CreateProjectModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
    open,
    handleClose,
  }) => {
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
        <Card>
          <CardHeader title="Create a new project" />
          <CardContent>
            {open && (
              <Formik
                initialValues={defaultValues}
                onSubmit={(values) => onSubmit(values)}
              >
                {({ values, handleChange }) => (
                  <Form>
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                    <TextField
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                    />
                    <TextField
                      name="projectManager"
                      value={values.projectManager}
                      onChange={handleChange}
                    />
                    <TextField
                      name="dueDate"
                      value={values.dueDate}
                      onChange={handleChange}
                    />
                    <Button
                      disabled={loading}
                      variant="contained"
                      onClick={() => onSubmit(values)}
                    >
                      Create
                      {loading && (
                        <CircularProgress
                          style={{ width: 20, height: 20, marginLeft: "10px" }}
                        />
                      )}
                    </Button>
                    <Button disabled={loading} onClick={handleClose}>
                      Cancel
                    </Button>
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
  