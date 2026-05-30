import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navigation.css";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar className="navbar-container" disableGutters>
        <Tooltip title="Toggle menu" placement="bottom">
          <IconButton
            className="navbar-menu-btn"
            onClick={onToggleSidebar}
            size="small"
            sx={{ width: 40, height: 40 }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <div className="navbar-brand" onClick={() => navigate("/home")}>
          <div className="navbar-logo">
            <img src="/Logo.png" alt="ProductHub Logo" />
          </div>
          <Typography className="navbar-title">ProductHub</Typography>
        </div>

        {user?.name && (
          <div className="navbar-user-badge">
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.75rem",
                fontWeight: 700,
                backgroundColor: "#FF6A00",
                color: "#fff",
              }}
            >
              {getInitials(user.name)}
            </Avatar>
            <span className="navbar-user-text">
              Hello, <span className="navbar-user-name">{user.name.split(" ")[0]}</span>
            </span>
          </div>
        )}

        <Tooltip title="Logout" placement="bottom">
          <Button
            onClick={handleLogout}
            startIcon={<LogoutIcon fontSize="small" />}
            size="small"
            className="navbar-logout-btn"
            sx={{ px: { xs: 1.5, sm: 2 }, py: 0.75, borderRadius: "8px" }}
          >
            <span style={{ display: "inline-block" }}>Logout</span>
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;