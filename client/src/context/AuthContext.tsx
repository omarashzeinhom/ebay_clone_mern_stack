import { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  password: string;
  // Add other user properties as needed
}

interface AuthContextType {
  token: string | null;
  user: User | null; // Include the user information
  login: (token: string, user: User , email: string , password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null  >(null); // Initialize user state

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // You may fetch the user information from the server here and set it in the state
      // Example: const user = fetchUserInformation(); setUser(user);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    // You may set the user information in the state here
    // Example: setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null); // Clear the user information on logout
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used with an AuthProvider");
  }
  return context;
};
