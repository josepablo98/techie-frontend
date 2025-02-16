import { SaveNewChatProps, UpdateChatProps } from "../interfaces";


export const saveNewChat = async ({ email, message } : SaveNewChatProps) => {
    try {
        const resp = await fetch("http://localhost:8080/chat/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error saving chat", error);
    }
}

export const updateChat = async ({ chatId, email, message } : UpdateChatProps) => {
    try {
        const resp = await fetch(`http://localhost:8080/chat/update/${chatId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, message }),
        })
        await resp.json();
    } catch (error) {
        console.error("Error updating chat", error);
    }
}