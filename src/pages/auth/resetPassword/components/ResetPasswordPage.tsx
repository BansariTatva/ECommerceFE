import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { useFormik } from "formik";
import { resetPasswordValidationSchema } from "../../../../schemas/resetPasswordValidationSchema";
import { useLocation } from "react-router-dom";
import { useResetPasswordHook } from "../resetPasswordHook";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('token');
  const { resetPassword } = useResetPasswordHook();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: resetPasswordValidationSchema,
    onSubmit: async (values) => {
      await resetPassword(values.password, id);
    }
  })

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Reset Password
        </Typography>

        <Typography variant="body2" color="text.secondary" textAlign="center" mb={2}>
          Enter your new password below.
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            margin="normal"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            required
            margin="normal"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
