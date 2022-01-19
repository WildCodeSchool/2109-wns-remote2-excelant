import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  TextField
} from "@mui/material";
import React, { useState, useRef } from "react";
import { FormProvider, useForm, NestedValue } from "react-hook-form";
import { Formik, Form } from "formik";
import { gql, useMutation } from "@apollo/client";

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
      <Card>
        <CardHeader title="Create a new task" />
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
                    name="project"
                    value={values.project}
                    onChange={handleChange}
                  />
                  <TextField
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  />
                  <TextField
                    name="assigne"
                    value={values.assigne}
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
                    Annuler
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

export default CreateTaskModal;
