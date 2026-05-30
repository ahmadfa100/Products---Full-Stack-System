import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import "./Layout.css";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="layout-container">
      <Navbar onToggleSidebar={handleToggleSidebar} />

      <Sidebar open={sidebarOpen} onClose={handleCloseSidebar} />

      <main className="layout-main">
        <div className="layout-content">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;