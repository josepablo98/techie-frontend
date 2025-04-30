import { DeleteAllChatsProps, DeleteChatProps, GeminiRequestProps, GetChatProps, GetChatsByUserIdProps, SaveNewChatProps, UpdateChatProps, UpdateTitleProps } from "../interfaces";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const saveNewChat = async ({ message, language }: SaveNewChatProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            },
            body: JSON.stringify({ message }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error saving chat", error);
    }
};

export const updateChat = async ({ chatId, message, language }: UpdateChatProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/update/${chatId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            },
            body: JSON.stringify({ message })
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating chat", error);
    }
};

export const updateTitle = async ({ chatId, title, language }: UpdateTitleProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/update-title/${chatId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            },
            body: JSON.stringify({ title }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating title", error);
    }
};

export const fetchGeminiApi = async ({ text, context, detailLevel, language }: GeminiRequestProps) => {
    try {
        const resp = await fetch("http://localhost:5000/chat/fetch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, context, detailLevel, language }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error fetching chat", error);
    }
};

export const getChatsByUserId = async ({ language } : GetChatsByUserIdProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/getchats`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            }
        })
        const data = await resp.json();
        return data.chats;
    } catch (error) {
        console.error("Error getting chats", error);
    }
};

export const getChatByUserIdAndChatId = async ({ chatId , language}: GetChatProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/getchat/${chatId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            }
        })
        const data = await resp.json();
        return data.chat;
    } catch (error) {
        console.error("Error getting chat", error);
    }
}

export const deleteChat = async ({ chatId, language }: DeleteChatProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/delete/${chatId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            }
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error deleting chat", error);
    }
}

export const deleteAllChats = async ({ language }: DeleteAllChatsProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/chat/delete`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            }
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error deleting all chats", error);
    }
}