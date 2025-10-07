import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

const dummyProducts = [
  { id: 1, name: "Product A", price: 20, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Product B", price: 35, image: "https://via.placeholder.com/150" },
];

export const Product = () => {
  return (
    <Grid container spacing={3}>
      {dummyProducts.map((product) => (
        <Grid component={'div'} item xs={12} sm={6} md={4} key={product.id}>
          <Card>
            <CardMedia component="img" height="180" image={product.image} alt={product.name} />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="text.secondary">${product.price}</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/products/${product.id}`} size="small">
                View
              </Button>
              <Button size="small">Add to Cart</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
