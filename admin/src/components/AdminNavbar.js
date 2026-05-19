import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
const AdminNavbar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left side: Logo + Products */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Typography variant="h6" component="div">
              MyAdmin
            </Typography>

            <div onMouseEnter={handleMenuOpen} onMouseLeave={handleMenuClose}>
              <Button color="inherit">Products</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
                PaperProps={{
                  sx: {
                    minWidth: "250px",
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "#8061b3",
                      color: "#fff",
                    },
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/products"
                  onClick={handleMenuClose}
                >
                  Product List
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/products/add"
                  onClick={handleMenuClose}
                >
                  Add Product
                </MenuItem>
              </Menu>
            </div>
          </div>

          {/* Right side: Logout */}
          <Button color="error" variant="contained" onClick={onLogout}>
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
