import { createContext, useState, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const loginUser = (name, id) => {
    setUserName(name);
    setUserId(id);
    localStorage.setItem("userId", id);
  };

  const logoutUser = () => {
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, userName, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);