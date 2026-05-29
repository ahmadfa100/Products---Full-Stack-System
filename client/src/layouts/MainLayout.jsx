import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />

      <Box
        component="main"
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3 },
          bgcolor: "#f5f6fa",
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;