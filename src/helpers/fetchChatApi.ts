import { DeleteChatProps, GeminiRequestProps, GetChatProps, GetChatsProps, SaveNewChatProps, UpdateChatProps, UpdateTitleProps } from "../interfaces";

export const saveNewChat = async ({ token, message }: SaveNewChatProps) => {
    try {
        const resp = await fetch("http://localhost:8080/chat/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, message }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error saving chat", error);
    }
};

export const updateChat = async ({ chatId, token, message }: UpdateChatProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/update/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, message }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating chat", error);
    }
};

export const updateTitle = async ({ chatId, token, title }: UpdateTitleProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/update-title/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, title }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating title", error);
    }
};

export const fetchGeminiApi = async ({ text, context }: GeminiRequestProps) => {
    try {
        const resp = await fetch("http://localhost:5000/chat/fetch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text, context }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error fetching chat", error);
    }
};

export const getChatsByUserId = async ({ token }: GetChatsProps) => {
    try {
        const resp = await fetch("http://localhost:8080/chat/getchats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
        const data = await resp.json();
        return data.chats;
    } catch (error) {
        console.error("Error getting chats", error);
    }
};

export const getChatByUserIdAndChatId = async ({ token, chatId }: GetChatProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/getchat/${chatId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
        const data = await resp.json();
        return data.chat;
    } catch (error) {
        console.error("Error getting chat", error);
    }
}

export const deleteChat = async ({ token, chatId }: DeleteChatProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/delete/${chatId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error deleting chat", error);
    }
}
