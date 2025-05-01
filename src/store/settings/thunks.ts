import { toast } from "react-toastify";
import { AppDispatch } from "../store";
import { setSettings } from "./settingsSlice";
import { updateSettings, getSettings } from "../../helpers";
import { GetSettingsThunkProps, UpdateSettingsThunkProps } from "../../interfaces";

// Thunk para ACTUALIZAR ajustes (persistencia en DB + store)
export const startUpdatingSettingsThunk = ({
    detailLevel,
    language,
    autoSaveChats,
    theme,
    globalContext
}: UpdateSettingsThunkProps) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await updateSettings({
                detailLevel,
                language,
                autoSaveChats,
                theme,
                globalContext
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
                    globalContext
                })
            );
        } catch (error) {
            console.error("Error updating settings", error);
            toast.error("Error actualizando ajustes");
        }
    };
};

export const startGettingSettingsThunk = ({ language }: GetSettingsThunkProps) => {
    return async (dispatch: AppDispatch) => {
        try {
            const data = await getSettings({ language });
            if (data?.ok && data.settings.length > 0) {
                const s = data.settings[0];
                const tempChats = !s.autoSaveChats;

                dispatch(
                    setSettings({
                        theme: s.theme,
                        language: s.language,
                        detailLevel: s.detailLevel,
                        tempChats,
                        globalContext: s.globalContext
                    })
                );
            }
        } catch (error) {
            console.error("Error getting settings", error);
            toast.error("Error obteniendo ajustes");
        }
    };
};
