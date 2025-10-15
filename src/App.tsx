import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import { Navbar, Footer } from "./components";
import { Orders, Product, SignUp, Login } from "./pages"
import { useEffect } from "react";
import OAuth2Callback from "./pages/auth/OAuth2Callback";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
};

// Redirect Component to handle root URL
const RedirectBasedOnToken = () => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (location.pathname === "/") {
      if (token) {
        window.location.href = "/login"; // Force redirect to dashboard if token exists
      } else {
        window.location.href = "/login"; // Redirect to login if no token
      }
    }
  }, [location.pathname, token]);

  // Return null or a loading state while redirecting
  return null;
};

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ my: 4 }}>
        <Routes>
          {/* Handle root URL redirection */}
          <Route path="/" element={<RedirectBasedOnToken />} />
          <Route path="/oauth2/callback" element={<OAuth2Callback />} />

          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/products" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Route path="/orders" element={<Orders />} />
              </ProtectedRoute>
            }
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
