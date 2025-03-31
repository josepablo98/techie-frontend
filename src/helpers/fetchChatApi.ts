import { DeleteChatProps, GeminiRequestProps, GetChatProps, SaveNewChatProps, UpdateChatProps, UpdateTitleProps } from "../interfaces";

export const saveNewChat = async ({ message }: SaveNewChatProps) => {
    try {
        const resp = await fetch("https://localhost:8080/chat/create", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error saving chat", error);
    }
};

export const updateChat = async ({ chatId, message }: UpdateChatProps) => {
    try {
        const resp = await fetch(`https://localhost:8080/chat/update/${chatId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating chat", error);
    }
};

export const updateTitle = async ({ chatId, title }: UpdateTitleProps) => {
    try {
        const resp = await fetch(`https://localhost:8080/chat/update-title/${chatId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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

export const getChatsByUserId = async () => {
    try {
        const resp = await fetch("https://localhost:8080/chat/getchats", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.json();
        return data.chats;
    } catch (error) {
        console.error("Error getting chats", error);
    }
};

export const getChatByUserIdAndChatId = async ({ chatId }: GetChatProps) => {
    try {
        const resp = await fetch(`https://localhost:8080/chat/getchat/${chatId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const data = await resp.json();
        return data.chat;
    } catch (error) {
        console.error("Error getting chat", error);
    }
}

export const deleteChat = async ({ chatId }: DeleteChatProps) => {
    try {
        const resp = await fetch(`https://localhost:8080/chat/delete/${chatId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error deleting chat", error);
    }
}

export const deleteAllChats = async () => {
    try {
        const resp = await fetch("https://localhost:8080/chat/delete", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error deleting all chats", error);
    }
}