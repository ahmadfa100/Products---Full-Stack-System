import { Children, createContext, use, useContext, useEffect, useState } from "react"; 
import api from "../api/axios.js"

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [use, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    const checkAuth = async ()=>{
        try{

            const token = localStorage.getItem("token")

            if(!token){
                setUser(null)
                return;
            }

            const response = await api.get("/auth/me");
            setUser(response.data.data);

        }catch(err){
            localStorage.removeItem("token");
            setUser(null);
        }finally{
            setCheckingAuth(false);
        }
    };

    useEffect(()=>{
        checkAuth();
    },[]);

    const login = async(email, password)=>{
        const reponse = await api.post("auth/login",{
            email, password
        });

        const token = reponse.data.data.token
        const user = reponse.data.data.user;

        localStorage.setItem("token", token);
        setUser(token);

        return response.data;
    };

    const register = async (name, email, password, confirmPassword)=>{
        const response = await api.post("auth/register",{
            name, email, password, confirmPassword
        });

        const token = response.data.data.token;
        const user = response.data.data.user;

        localStorage.setItem("token", token)
        setUser(user);

        return response.data;
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <authContext.Provider
        value = {{user, checkAuth, login, register, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}