import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField,
  Box
} from "@mui/material";
import React, { useState, useRef } from "react";
import { FormProvider, useForm, NestedValue } from "react-hook-form";
import { Formik, Form } from "formik";
import { gql, useMutation } from "@apollo/client";
import { modalStyle } from "../../_utils/modalStyle";

interface CreateTaskInput {
  name: string;
  project: string;
  status: string;
  assigne: string;
  dueDate: string;
}

const defaultValues: CreateTaskInput = {
  name: "",
  project: "",
  status: "",
  assigne: "",
  dueDate: ""
};

const CreateTaskModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose
}) => {
  const [loading, setLoading] = useState(false);
  const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        name
        project
        status
        assigne
        dueDate
      }
    }
  `;
  const [createTask, { data, error }] = useMutation(CREATE_TASK);

  const onSubmit = (values: CreateTaskInput) => {
    setLoading(true);
    try {
      createTask({ variables: { input: values } });
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
        <CardHeader title="Create a new task" sx={{ textAlign: "center" }} />
        <CardContent>
          {open && (
            <Formik
              initialValues={defaultValues}
              onSubmit={(values) => onSubmit(values)}
            >
              {({ values, handleChange }) => (
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
                      <TextField
                        name="project"
                        value={values.project}
                        onChange={handleChange}
                        label="Project"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                      <TextField
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        label="Status"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
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
                      <TextField
                        name="dueDate"
                        value={values.dueDate}
                        onChange={handleChange}
                        label="Due Date"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                    {/**
                     * The description field
                     * Disabled because actually not supported
                     */}
                    <TextField
                      name="description"
                      value={""}
                      onChange={handleChange}
                      label="Description"
                      size="small"
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

export default CreateTaskModal;
