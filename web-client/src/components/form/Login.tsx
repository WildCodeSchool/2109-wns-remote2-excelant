import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { Link, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLoginMutation } from "../../hooks/loginMutation";
import { AuthContext } from "../../contexts/AuthContext";

import ExcelantLogo from "../../images/logo_excelant.png";
import { loginSchema } from "../../yupSchema/Login";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { loggedIn, authToken, setAuthToken }: any = useContext(AuthContext);
  console.log(authToken);
  const [toHome, setHome] = useState(false);

  // We import our loginMutation here
  const [login] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }: LoginFormValues) => {
      try {
        await login(email, password);
        loggedIn();
        setHome(true);
      } catch (error) {
        // TO DO: Properly handle errors and display them on the front
        console.error(error);
      }
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
            Sign In
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
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
              Sign In
            </Button>
          </form>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item mt={1} mb={2}>
              <Link
                data-testid="Register"
                to="/register"
                style={{ fontSize: "0.875rem" }}
              >
                No account? Sign Up
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

export default Login;
