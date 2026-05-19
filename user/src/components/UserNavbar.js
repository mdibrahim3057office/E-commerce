import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container, Box } from "@mui/material";

const UserNavbar = ({ onLogout }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "inherit",
                fontWeight: 600,
              }}
            >
              MyShop
            </Typography>

            {/* Products */}
            <Button component={Link} to="/products" color="inherit">
              Products
            </Button>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/cart"
              variant="outlined"
              color="primary"
            >
              Cart
            </Button>

            <Button color="error" variant="contained" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNavbar;
