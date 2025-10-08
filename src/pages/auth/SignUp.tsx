import { useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData]: any = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNo: "",
        address: "",
        acceptTerms: false,
    });

    const [errors, setErrors]: any = useState({});
    const [success, setSuccess] = useState("");

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const validate = () => {
        let tempErrors: any = {};
        if (!formData.name) tempErrors.name = "Name is required";
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.password) tempErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword)
            tempErrors.confirmPassword = "Passwords do not match";
        if (!formData.address) tempErrors.address = "Address is required";
        if (!formData.phoneNo) tempErrors.phoneNo = "Number is required";
        if (!formData.acceptTerms)
            tempErrors.acceptTerms = "You must accept terms and conditions";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form Data:", formData);
            setSuccess("Account created successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                acceptTerms: false,
            });
            setErrors({});
            // Call your API here
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Sign Up
                </Typography>

                {success && <Alert severity="success">{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                    />
                    <TextField
                        fullWidth
                        label="Phone No"
                        name="phoneNo"
                        type="number"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.phoneNo}
                        helperText={errors.phoneNo}
                    />

                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.address}
                        helperText={errors.address}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                name="acceptTerms"
                            />
                        }
                        label={
                            <>
                                I accept the{" "}
                                <Link to="/terms" target="_blank">
                                    terms and conditions
                                </Link>
                            </>
                        }
                    />
                    {errors.acceptTerms && (
                        <Typography color="error" variant="body2">
                            {errors.acceptTerms}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>

                    <Typography align="center">
                        Already have an account? <Link to="/login">Login here</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUp;
