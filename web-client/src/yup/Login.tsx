import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email")
        .required("Please insert an email address")
});
