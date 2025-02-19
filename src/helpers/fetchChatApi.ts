import { GeminiRequestProps, SaveNewChatProps, UpdateChatProps, UpdateTitleProps } from "../interfaces";

export const saveNewChat = async ({ email, message }: SaveNewChatProps) => {
    try {
        const resp = await fetch("http://localhost:8080/chat/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error saving chat", error);
    }
};

export const updateChat = async ({ chatId, email, message }: UpdateChatProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/update/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating chat", error);
    }
};

export const updateTitle = async ({ chatId, email, title }: UpdateTitleProps) => {
    try {
        console.table({ chatId, email, title });
        const resp = await fetch(`http://localhost:8080/chat/update-title/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, title }),
        });
        await resp.json();
    } catch (error) {
        console.error("Error updating title", error);
    }
};

export const fetchGeminiApi = async ({ text, context }: GeminiRequestProps) => {
    try {
        const resp = await fetch("http://localhost:8080/chat/fetch", {
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
