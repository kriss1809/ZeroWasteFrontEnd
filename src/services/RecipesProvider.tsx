import React, { createContext, useContext, useEffect, useState } from 'react';
import { Recipe } from '../entities/Recipe';
import { GetRecipes } from './apiClient';
import { useAuth } from './authProvider';
import { useWebSocket } from './WebSocketProvider';

interface RecipesContextValue {
    recipes: Recipe[];
    getRecipes: () => Promise<void>;
}

const RecipesContext = createContext<RecipesContextValue | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
    const { messages, isConnected } = useWebSocket();

    useEffect(() => {
        if (accessToken) {
            getRecipes();
        }
    }, [accessToken, messages]);

    const getRecipes = async () => {
        const response = await GetRecipes();
        if (response) {
            setRecipes(response);
        }
        else {
            if(localStorage.getItem("refreshToken")){
                refreshAccessToken();
            }
        }
    };

    return (
        <RecipesContext.Provider value={{ recipes, getRecipes }}>
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipesProvider');
    }
    return context;
};

