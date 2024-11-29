import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './authProvider';

const url = "ws://localhost:8000/"
// const url = "ws://192.168.100.92:8000/";

interface MessageData {
  type: string;
  payload: any;
}

interface WebSocketContextValue {
    sendMessage: (message: any) => void;
    messages: MessageData[];
    isConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, accessToken, user } = useAuth();
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (isAuthenticated && user) {
            console.log("Connecting to WebSocket");
            const token = accessToken;
            if (!token) return;

            const wsUrl = `${url}ws/notifications/`;
            const socket = new WebSocket(wsUrl);

            socket.onopen = () => {
                setIsConnected(true);
                socket.send(JSON.stringify({ type: 'authorization', payload: { token, share_code: sessionStorage.getItem("share_code"), email: user?.email} }));
            };

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log('WebSocket message:', data);
                setMessages((prev) => [...prev, data]);
            };

            socket.onclose = () => {
                setIsConnected(false);
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            setWs(socket);

            return () => {
                socket.close();
            };
        };
    }, [isAuthenticated]);

    const sendMessage = (message: any) => {
        if (ws && isConnected) {
        ws.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, messages, isConnected }}>
        {children}
        </WebSocketContext.Provider>
    );
    };

    export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
