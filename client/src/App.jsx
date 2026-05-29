import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ManageProducts from "./pages/ManageProducts";

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to ="/home" replace/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-products"
            element={
              <ProtectedRoute>
                <ManageProducts/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
