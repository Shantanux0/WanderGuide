import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, store } from "@/lib/store";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, name: string) => Promise<void>;
    logout: () => void;
    toggleFavorite: (destinationId: number) => void;
    updateUser: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for persisted user
        const savedUser = localStorage.getItem("wg_user");
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
                localStorage.removeItem("wg_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, name: string) => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const role = "user";

        // Create new user session
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            role,
            favorites: [],
        };

        setUser(newUser);
        localStorage.setItem("wg_user", JSON.stringify(newUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("wg_user");
        // Clear itineraries for this session if we were being strict, but we'll leave them for demo persistence
    };

    const toggleFavorite = (destinationId: number) => {
        if (!user) return;

        const newFavorites = user.favorites.includes(destinationId)
            ? user.favorites.filter(id => id !== destinationId)
            : [...user.favorites, destinationId];

        const updatedUser = { ...user, favorites: newFavorites };
        setUser(updatedUser);
        localStorage.setItem("wg_user", JSON.stringify(updatedUser));
    };

    const updateUser = async (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem("wg_user", JSON.stringify(updatedUser));
        return Promise.resolve();
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, toggleFavorite, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
