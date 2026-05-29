import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({children})=>{
    const {user, checkingAuth} = useAuth();

    if(checkingAuth){
        return(
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
        )
    }
    if(!user){
        return <Navigate to ="/login" replace/>
    }
    return children;
}

export default ProtectedRoute;