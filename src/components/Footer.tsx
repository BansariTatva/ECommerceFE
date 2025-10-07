import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: "center", bgcolor: "grey.100", mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} E-commerce. All rights reserved.
      </Typography>
    </Box>
  );
};
