import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Container, Box } from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const UserNavbar = ({ onLogout }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        py: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="/images/logo.jpg"
              alt="Logo"
              sx={{
                height: 58,
                borderRadius: "10px",
              }}
            />

            {/* Products */}
            <Button
              component={Link}
              to="/products"
              sx={{
                color: "#111827",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                borderRadius: "10px",
                px: 2,
                py: 1,

                "&:hover": {
                  backgroundColor: "#f3f4f6",
                },
              }}
            >
              Products
            </Button>
          </Box>

          {/* Right Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Cart */}
            <Button
              component={Link}
              to="/cart"
              startIcon={<ShoppingCartOutlinedIcon />}
              variant="outlined"
              sx={{
                borderColor: "#d1d5db",
                color: "#111827",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
                px: 2.5,
                py: 1,

                "&:hover": {
                  borderColor: "#7c3aed",
                  backgroundColor: "#f5f3ff",
                  color: "#7c3aed",
                },
              }}
            >
              Cart
            </Button>

            {/* Logout */}
            <Button
              variant="contained"
              onClick={onLogout}
              sx={{
                backgroundColor: "#dc2626",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "10px",
                px: 3,
                py: 1,

                "&:hover": {
                  backgroundColor: "#b91c1c",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNavbar;
