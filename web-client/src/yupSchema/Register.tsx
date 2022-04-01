import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is invalid")
        .required("Please insert an email address"),
    password: Yup.string()
        .min(6, "Password must contain at least 6 characters")
        .max(25, "Password must not exceed 25 characters")
        .matches(
            new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
            "Password must contain at least one capital letter, one number and a specific character"
        )
        .required("Please enter a password"),
    confirmPassword: Yup.string()
        .required("Password confirmation is mandatory")
        .oneOf([Yup.ref("password"), null], "Password confirmation does not match")
});
