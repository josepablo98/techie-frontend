import { GetSettingsProps, UpdateSettingsProps } from "../interfaces";


export const getSettings = async ({ token } : GetSettingsProps) => {
    try {
        const resp = await fetch("http://localhost:8080/settings/get-settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error getting settings", error);
    }
}

export const updateSettings = async ({ token, detailLevel, language, autoSaveChats, theme } : UpdateSettingsProps) => {
    try {
        const resp = await fetch("http://localhost:8080/settings/update-settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, detailLevel, language, autoSaveChats, theme }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error updating settings", error);
    }
}