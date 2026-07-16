import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();
const CURRENT_USER_STORAGE_KEY = "fashion-current-user";
const TOKEN_STORAGE_KEY = "fashion-auth-token";

const readStoredCurrentUser = () => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        const storedUser = window.localStorage.getItem(CURRENT_USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
};

const readStoredToken = () => {
    if (typeof window === "undefined") {
        return null;
    }

    return window.localStorage.getItem(TOKEN_STORAGE_KEY) || null;
};

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(readStoredCurrentUser);
    const [token, setToken] = useState(readStoredToken);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(readStoredCurrentUser()));

    useEffect(() => {
        if (currentUser) {
            window.localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(currentUser));
        } else {
            window.localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
        }
    }, [currentUser]);

    useEffect(() => {
        if (token) {
            window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        } else {
            window.localStorage.removeItem(TOKEN_STORAGE_KEY);
        }
    }, [token]);

    const register = async (name, identifier, password) => {
        try {
            const response = await registerUser(name, identifier, password);
            const user = response.user || { id: Date.now().toString(), name, email: identifier };
            setCurrentUser(user);
            setToken(response.token || null);
            setIsLoggedIn(true);
            return { success: true, user, token: response.token || null };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Unable to register right now.",
            };
        }
    };

    const login = async (identifier, password) => {
        try {
            const response = await loginUser(identifier, password);
            const user = response.user || { id: Date.now().toString(), name: "Customer", email: identifier };
            setCurrentUser(user);
            setToken(response.token || null);
            setIsLoggedIn(true);
            return { success: true, user, token: response.token || null };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Unable to log in right now.",
            };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setToken(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                currentUser,
                token,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);