import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { Navbar, Footer } from "./components";
import { Home, Product } from "./pages"
import { Cart } from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ my: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
