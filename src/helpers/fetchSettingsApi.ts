import { UpdateSettingsProps } from "../interfaces";


export const getSettings = async () => {
    try {
        const resp = await fetch("https://localhost:8080/settings/get-settings", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error getting settings", error);
    }
}

export const updateSettings = async ({ detailLevel, language, autoSaveChats, theme } : UpdateSettingsProps) => {
    try {
        const resp = await fetch("https://localhost:8080/settings/update-settings", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ detailLevel, language, autoSaveChats, theme }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error updating settings", error);
    }
}