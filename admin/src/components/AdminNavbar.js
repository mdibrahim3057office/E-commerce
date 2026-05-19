import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const AdminNavbar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

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
          {/* Left */}
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

            {/* Products Menu */}
            <Box onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
              <Button
                endIcon={<KeyboardArrowDownIcon />}
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

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{
                  onMouseLeave: handleMenuClose,
                }}
                sx={{
                  "& .MuiPaper-root": {
                    width: "190px",
                    borderRadius: "14px",
                    mt: 1,
                    p: 1,
                    boxShadow: "0px 10px 30px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/products"
                  onClick={handleMenuClose}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#ede9fe",
                      color: "#6d28d9",
                    },
                  }}
                >
                  Product List
                </MenuItem>

                <MenuItem
                  component={Link}
                  to="/products/add"
                  onClick={handleMenuClose}
                  sx={{
                    borderRadius: "10px",
                    py: 1.2,
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "0.2s",

                    "&:hover": {
                      backgroundColor: "#ede9fe",
                      color: "#6d28d9",
                    },
                  }}
                >
                  Add Product
                </MenuItem>
              </Menu>
            </Box>
          </Box>

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

              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
