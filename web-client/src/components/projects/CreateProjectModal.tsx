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
  FormControl,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import moment from "moment";
import { modalStyle } from "../../_utils/modalStyle";
import GqlRequest from "../../_graphql/GqlRequest";
import Notification from "../../_utils/Notification";

type Status = string;

interface CreateProjectInput {
  name: string;
  status: Status;
  projectManager: string;
  dueDate: moment.Moment;
}

const defaultValues: CreateProjectInput = {
  name: "",
  status: "",
  projectManager: "",
  dueDate: moment(),
};

const CreateProjectModal: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [createProject] = useMutation(
    new GqlRequest("Project").create("name, status, projectManager, dueDate")
  );

  const checkInputs = (values: CreateProjectInput) => {
    const newErrors: string[] = [];
    if (!values.name) {
      newErrors.push("no_name");
    }
    if (
      !values.status ||
      !["ongoing", "done", "archived"].includes(values.status)
    ) {
      newErrors.push("no_status");
    }
    if (!values.projectManager) {
      newErrors.push("no_project_manager");
    }
    setErrors(newErrors);
    return newErrors;
  };

  const onSubmit = async (values: CreateProjectInput) => {
    try {
      setLoading(true);
      if (checkInputs(values).length > 0) {
        throw new Error("invalid inputs");
      }
      const res = await createProject({ variables: { input: values } });
      if (res) {
        setNotify({
          isOpen: true,
          message: "Your project has been created successfully!",
          type: "success",
        });
        setErrors([]);
        handleClose();
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setErrors([]);
          handleClose();
        }}
      >
        <Card sx={{ ...modalStyle, padding: "8px 24px" }}>
          <CardHeader
            title="Create a new project"
            sx={{ textAlign: "center" }}
          />
          <CardContent>
            {open && (
              <Formik
                initialValues={defaultValues}
                onSubmit={(values) => onSubmit(values)}
              >
                {({ values, handleChange, setFieldValue }) => (
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
                          error={errors.includes("no_name")}
                          helperText={
                            errors.includes("no_name") && "Please enter a name"
                          }
                        />
                        <FormControl sx={{ flexGrow: 1 }}>
                          <InputLabel
                            id="status-label"
                            error={errors.includes("no_status")}
                          >
                            Project status
                          </InputLabel>
                          <Select
                            name="status"
                            labelId="status-label"
                            label="Project status"
                            onChange={handleChange}
                            value={values.status}
                            error={errors.includes("no_status")}
                          >
                            <MenuItem value="ongoing">En cours</MenuItem>
                            <MenuItem value="done">Terminé</MenuItem>
                            <MenuItem value="archived">Archivé</MenuItem>
                          </Select>
                          <FormHelperText error>
                            {errors.includes("no_status") &&
                              "Please select a valid status"}
                          </FormHelperText>
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
                          error={errors.includes("no_project_manager")}
                          helperText={
                            errors.includes("no_project_manager") &&
                            "Please enter a user name"
                          }
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
                              {...params}
                              name="dueDate"
                              sx={{ flexGrow: 1 }}
                            />
                          )}
                        />
                      </Box>
                      <TextField
                        name="description"
                        value=""
                        onChange={handleChange}
                        label="Description"
                        multiline
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
      <Notification
        isOpen={notify.isOpen}
        message={notify.message}
        type="success"
        setNotify={setNotify}
      />
    </>
  );
};

export default CreateProjectModal;
