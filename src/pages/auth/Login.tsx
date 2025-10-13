
import React, { useEffect, useState } from "react";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);

    const validate = () => {
        const tempErrors = {};
        if (!formData.email) {
            tempErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid";
        }
        if (!formData.password) tempErrors.password = "Password is required";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8081/oauth2/authorization/google"; // Initiate OAuth2 flow
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response: any = await api.post(
                    "/auth/logIn",
                    formData
                );
                console.log("response===", JSON.stringify(response));
                if (response?.accessToken) localStorage.setItem("accessToken", response.accessToken); // Store access token
                if (response?.refreshToken) localStorage.setItem("refreshToken", response.refreshToken); // Store refresh token
                setSuccess("Login successful!");
                setSuccess("Logged in successfully!");
                setTimeout(() => {
                    navigate("/dashboard"); // Redirect to dashboard or protected route
                }, 1000);
                setErrors({});
            } catch (error: any) {
                setErrors(error.message || "Login failed");
            }

            // Call your login API here
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
                    Login
                </Typography>

                {success && <Alert severity="success">{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>

                    <Button variant="outlined" color="primary" onClick={handleGoogleLogin} fullWidth>
                        Login with Google
                    </Button>

                    <Typography align="center" variant="body2">
                        Don't have an account? <Link to="/signUp">Sign Up</Link>
                    </Typography>

                    <Typography align="center" variant="body2" sx={{ mt: 1 }}>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

