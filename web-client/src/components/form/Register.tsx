import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import GqlRequest from "../../_graphql/GqlRequest";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { registerSchema } from "../../yup/Register";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import {CircularProgress} from "@mui/material";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExcelantLogo from '../../images/logo_excelant.jpg';
import { Link, Navigate } from 'react-router-dom';
import CustomTextField from './TextField';

interface CreateUserInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const registerDefaultValues: CreateUserInput = {
    email: "",
    password: "",
    confirmPassword: "",
}

const Register = () => {
    const [toHome, setToHome] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createUser] = useMutation(
        new GqlRequest("User").create("email, password, confirmPassword")
    );

    const onSubmit = async (values: CreateUserInput) => {
        setLoading(true);
        try {
           await createUser({ variables: { input: values }});
        } catch (err) {
           return console.log(`Error ${err}`);
        } finally {
            setLoading(false);
        }

        // if (enteredEmail.trim() === '') {
        //     return setEnteredEmailIsValid(false);
        // }
        // setEnteredEmailIsValid(true);

        // TODO: check password conditions
        // setIsErrorConfirmPassword(e.target.value);
        // if (password !== confirmPassword) return setIsErrorConfirmPassword("Confirm password should be match with password!");
        // if (password.length < 6) return setIsErrorLengthPassword("Your password must contain at least 6 characters!");

        console.log("Success form submission");
        // return setToHome(true);
    }

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
                    <img src={ExcelantLogo} alt="Excelant logo"  />
                    <Typography component="h2" variant="h5" sx={{ mt: 2, mb: 1 }}>
                        Sign Up
                    </Typography>
                    <Formik
                        initialValues={registerDefaultValues}
                        validationSchema={registerSchema}
                        onSubmit={(values) => onSubmit(values)}
                    >
                        {({ values, handleChange }) => (
                            <Form>
                                {/*<TextField*/}
                                {/*    margin="normal"*/}
                                {/*    required*/}
                                {/*    fullWidth*/}
                                {/*    id="email"*/}
                                {/*    label="Email Address"*/}
                                {/*    name="email"*/}
                                {/*    type="email"*/}
                                {/*    autoComplete="email"*/}
                                {/*    autoFocus*/}
                                {/*    value={values.email}*/}
                                {/*    sx={{ width: "100%" }}*/}
                                {/*    onChange={handleChange}*/}
                                {/*/>*/}
                                <CustomTextField
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="small"
                                    className="text-danger"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password"
                                    label="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="small"
                                    className="text-danger"
                                />
                                <FormHelperText>
                                    Your password must contain at least six characters, including a number, an upper case letter and a specific character
                                </FormHelperText>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="small"
                                    className="text-danger"
                                />
                                <Button
                                    disabled={loading}
                                    fullWidth
                                    variant="contained"
                                    onClick={() => onSubmit(values)}
                                    sx={{ mt: 3, mb: 2, bgcolor: "#B6B8EB", "&.MuiButtonBase-root:hover": { bgcolor: "#adafe0", boxShadow: 4 } }}
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
                            </Form>
                        )}
                    </Formik>
                    <Grid container justifyContent="center">
                        <Grid item mt={1} mb={2}>
                            <Link to="/login" style={{ fontSize: "0.875rem" }}>
                                Already have an account? Sign Up
                            </Link>
                        </Grid>
                        <Grid item>
                            {/*<Link  variant="body2">*/}
                            {/*    Forgot password?*/}
                            {/*</Link>*/}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Register;
