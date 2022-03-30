import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExcelantLogo from '../../images/logo_excelant.jpg';
import { Link } from "react-router-dom";
import {FormControl} from "@mui/material";

const Register = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredEmailIsValid, setEnteredEmailIsValid] = useState(true);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState("");

    // const checkPasswordValidation = (e: any) => {
    //     setConfirmPassword(e.target.value);
    //     if (password !== confirmPassword) {
    //         setIsError("Confirm password should be match with password");
    //     }
    // }

    const formSubmissionHandler = (e: any) => {
        e.preventDefault();
        console.log('test');

        if (enteredEmail.trim() === '') {
            return setEnteredEmailIsValid(false);
        }

        setEnteredEmailIsValid(true);

        setConfirmPassword(e.target.value);
        if (password !== confirmPassword) {
            setIsError("Confirm password should be match with password");
        } else {
            console.log("success");
        }
    }

    return (
        <>
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
                    <Box sx={{ position: "absolute" }}>
                        {isError}
                    </Box>
                <FormControl onSubmit={formSubmissionHandler}>
                {/*<form onSubmit={formSubmissionHandler}>*/}
                {/*<Box sx={{ mt: 1 }}>*/}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={enteredEmail}
                            sx={{ width: "100%" }}
                            onChange={(e) => setEnteredEmail(e.target.value)}
                        />
                    {!enteredEmailIsValid && <Typography color="warning">Email must not be empty.</Typography>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            // autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirmpassword"
                            label="Confirm Password"
                            name="confirmpassword"
                            type="password"
                            // autoComplete="current-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: "#B6B8EB", "&.MuiButtonBase-root:hover": { bgcolor: "#adafe0", boxShadow: 4 } }}
                        >
                            Sign Up
                        </Button>
                    {/*</form>*/}
                    </FormControl>
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
                {/*</Box>*/}
            </Container>
        </>
    );
};

export default Register;
