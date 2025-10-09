import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    Button,
    Paper,
} from "@mui/material";

import { Delete } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

export const Cart = () => {
    const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {cart.length === 0 ? (
                <Typography variant="body1">Your cart is empty.</Typography>
            ) : (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                {/* <TableCell align="right">${item.price.toFixed(2)}</TableCell> */}
                                <TableCell align="right">
                                    <TextField
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateQuantity(item.id, parseInt(e.target.value) || 1)
                                        }
                                        inputProps={{ min: 1 }}
                                        size="small"
                                        sx={{ width: 80 }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="error"
                                        onClick={() => removeFromCart(item.id)}
                                >
                                    <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
                    Total Items: {getTotalItems()}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: "right" }}>
                    Total Price: ${getTotalPrice().toFixed(2)}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, float: "right" }}
                    onClick={() => alert("Proceed to checkout (not implemented)")}
                >
                    Checkout
                </Button>
            </>
            )}
        </Container>
    );
};