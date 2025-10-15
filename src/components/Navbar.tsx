import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}
        >
          Home
        </Typography>

        <div>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/orders">
            Orders
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={2} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
