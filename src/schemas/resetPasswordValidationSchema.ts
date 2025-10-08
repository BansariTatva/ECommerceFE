import * as Yup from "yup";


export const resetPasswordValidationSchema = Yup.object({
    password: Yup.string()
        .min(8, "Passowrd must be at least 8 characters long")
        .required("Password is required")
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Password and confirm password must match')
        .required("Confirm Password is required")
});