import React, { createContext, useContext, useEffect, useState } from 'react';
import { Recipe } from '../entities/Recipe';
import { GetRecipes } from './apiClient';
import { useAuth } from './authProvider';
import { useWebSocket } from './WebSocketProvider';

interface RecipesContextValue {
    recipes: Recipe[];
    getRecipes: () => Promise<void>;
    loadMoreRecipes: () => Promise<void>;
    resetRecipes: () => Promise<void>;
    hasMore: boolean;
    isLoading: boolean;
}

const RecipesContext = createContext<RecipesContextValue | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [limit] = useState<number>(10); // Numărul de elemente per pagină
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isAuthenticated, accessToken, refreshAccessToken } = useAuth();
    const { messages } = useWebSocket();

    useEffect(() => {
        if (accessToken) {
            resetRecipes();
        }
    }, [accessToken, messages]);

    const resetRecipes = async () => {
        setRecipes([]);
        setOffset(0);
        setHasMore(true);
        await getRecipes(true);
    };

    const getRecipes = async (isInitialLoad = false) => {
        if (isLoading || (!hasMore && !isInitialLoad)) return;
        setIsLoading(true);
        const response = await GetRecipes(limit, isInitialLoad ? 0 : offset);
        if (response) {
            setRecipes((prev) => (isInitialLoad ? response.results : [...prev, ...response.results]));
            setOffset((prev) => prev + limit);
            setHasMore(!!response.next); // Verificăm dacă există o altă pagină
        } else {
            if (localStorage.getItem("refreshToken")) {
                refreshAccessToken();
            }
        }
        setIsLoading(false);
    };

    const loadMoreRecipes = async () => {
        await getRecipes();
    };

    return (
        <RecipesContext.Provider value={{ recipes, getRecipes, loadMoreRecipes, hasMore, isLoading, resetRecipes }}>
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
