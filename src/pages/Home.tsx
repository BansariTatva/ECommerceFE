import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <Container sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Welcome to E-Commerce
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Find the best products at unbeatable prices.
      </Typography>
      <Button variant="contained" component={Link} to="/products">
        Shop Now
      </Button>
    </Container>
  );
};
