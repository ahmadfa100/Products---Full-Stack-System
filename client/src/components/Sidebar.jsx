import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navigation.css";

const SIDEBAR_WIDTH = 260;

const navItems = [
  { label: "Home", icon: HomeIcon, path: "/home" },
  { label: "Manage Products", icon: InventoryIcon, path: "/manage-products" },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: SIDEBAR_WIDTH,
        },
      }}
    >
      <Box sx={{ px: 2.5, pt: 2.5, pb: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <div className="navbar-logo">
          <img src="/Logo.png" alt="ProductHub Logo" />
        </div>
        <Box>
          <Typography className="navbar-title" sx={{ lineHeight: 1.1, fontSize: "1.1rem" }}>
            ProductHub
          </Typography>
          <Typography variant="caption" sx={{ color: "#5A5A7A", fontSize: "0.68rem" }}>
            Management System
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mx: 2, mb: 2 }} />

      <Typography
        variant="caption"
        sx={{
          px: 3,
          py: 1,
          display: "block",
          color: "#A0A0B8",
          fontSize: "0.65rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Navigation
      </Typography>

      <List sx={{ px: 1.5, gap: 0.5, display: "flex", flexDirection: "column" }}>
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <ListItemButton
              key={path}
              onClick={() => goTo(path)}
              selected={isActive}
              sx={{ py: 1.2, mb: 0.5 }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: isActive ? "#FF6A00" : "#5A5A7A",
                }}
              >
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#FF6A00" : "#1A1A2E",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;