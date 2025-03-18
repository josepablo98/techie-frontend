import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { setSettings } from "./settingsSlice";
import { updateSettings, getSettings } from "../../helpers";
import { UpdateSettingsProps } from "../../interfaces";

// Thunk para ACTUALIZAR ajustes (persistencia en DB + store)
export const updateSettingsThunk = ({
    token,
    detailLevel,
    language,
    autoSaveChats,
    theme,
}: UpdateSettingsProps) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await updateSettings({
                token,
                detailLevel,
                language,
                autoSaveChats,
                theme,
            });
            if (!data.ok) {
                return toast.error(data.message);
            }
            toast.success(data.message);

            // Guardamos en Redux (adaptando autoSaveChats a boolean si es 0/1)
            dispatch(
                setSettings({
                    theme,
                    language,
                    detailLevel,
                    tempChats: autoSaveChats === 0,
                })
            );
        } catch (error) {
            console.error("Error updating settings", error);
            toast.error("Error actualizando ajustes");
        }
    };
};

export const getSettingsThunk = (token: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await getSettings({ token });
            if (data?.ok && data.settings.length > 0) {
                const s = data.settings[0];
                const tempChats = !s.autoSaveChats;

                dispatch(
                    setSettings({
                        theme: s.theme,
                        language: s.language,
                        detailLevel: s.detailLevel,
                        tempChats,
                    })
                );
            }
        } catch (error) {
            console.error("Error getting settings", error);
            toast.error("Error obteniendo ajustes");
        }
    };
};
