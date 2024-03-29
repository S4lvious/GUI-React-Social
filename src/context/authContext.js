import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { makeRequest } from "../axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
      const res = await makeRequest.post("/auth/login", inputs, {
        withCredentials:true,
      })
      await setCurrentUser(res.data)
    };

    const logout = async () => {
      const res = await makeRequest.post("/auth/logout", {
        withCredentials:true,
      })
     await setCurrentUser(null)
    };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};