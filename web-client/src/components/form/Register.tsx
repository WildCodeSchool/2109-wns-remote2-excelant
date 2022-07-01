import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { registerSchema } from "../../yupSchema/Register";
import GqlRequest from "../../_graphql/GqlRequest";
import ExcelantLogo from "../../images/logo_excelant.png";
import { Roles } from "../../_types/_userTypes";

const Register: React.FC = () => {
  const [toHome, setToHome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createUser] = useMutation(
    new GqlRequest("User").create("name, email, roles, password")
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      roles: [Roles.USER],
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { name, email, roles, password, confirmPassword } = values;
      try {
        if (password === confirmPassword) {
          await createUser({
            variables: {
              input: {
                name,
                email,
                roles,
                password,
              },
            },
          });
        }
      } catch (err) {
        return console.log(`${err}`);
      } finally {
        setLoading(false);
      }
      return setToHome(true);
    },
  });

  return (
    <>
      {toHome ? <Navigate to="/" /> : null}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={ExcelantLogo} alt="Excelant logo" />
          <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormHelperText>
              Your password must contain at least six characters, including a
              number, a lower case letter, an upper case letter and a specific
              character
            </FormHelperText>
            <TextField
              fullWidth
              margin="normal"
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              disabled={loading}
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#B6B8EB",
                "&.MuiButtonBase-root:hover": {
                  bgcolor: "#adafe0",
                  boxShadow: 4,
                },
              }}
            >
              Sign Up
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
          </form>
          <Grid container justifyContent="center">
            <Grid item mt={1} mb={2}>
              <Link
                data-testid="Login"
                to="/login"
                style={{ fontSize: "0.875rem" }}
              >
                Already have an account? Sign Up
              </Link>
            </Grid>
            <Grid item>
              <Link to="#" style={{ fontSize: "0.875rem" }}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Register;
