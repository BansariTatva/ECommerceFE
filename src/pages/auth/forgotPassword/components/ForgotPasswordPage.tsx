import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { forgotValidationSchema } from "../../../../schemas/forgotSchema";
import { useForgotPasswordHook } from "../forgotPasswordHook";

const ForgotPassword: React.FC = () => {
  const { forgotPassword } = useForgotPasswordHook();
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: forgotValidationSchema,
    onSubmit: async (values) => {
      const email = values.email;
      await forgotPassword(email);
    }
  })

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Forgot Password
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
          Enter your email and we’ll send you a password reset link.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            name="email"
            fullWidth
            required
            margin="normal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            value={formik.values.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
