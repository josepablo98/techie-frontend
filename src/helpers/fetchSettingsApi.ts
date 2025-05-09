import { GetSettingsProps, UpdateSettingsProps } from "../interfaces";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getSettings = async ({ language }: GetSettingsProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/settings/get-settings`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            },
        })
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error getting settings", error);
    }
}

export const updateSettings = async ({ detailLevel, language, autoSaveChats, theme, globalContext } : UpdateSettingsProps) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/settings/update-settings`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept-Language": language,
            },
            body: JSON.stringify({ detailLevel, language, autoSaveChats, theme, globalContext }),
        });
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error("Error updating settings", error);
    }
}