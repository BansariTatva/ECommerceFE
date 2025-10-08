import { Routes, Route } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Navbar, Footer } from "./components";
import { Product } from "./pages"
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/ResetPasswordPage";

function App() {
  return (
    <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        <Navbar />
        <Container sx={{
          my: 4, flex: 1, display: 'flex'
        }}>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default App;
