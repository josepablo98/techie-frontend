import { AppDispatch } from "../store";

export interface ChatFormProps {
    message: string;
    index: number;
}

export interface CheckTokenProps {
    dispatch: AppDispatch;
}

export interface ChatBoxProps {
    context?: ChatFormProps[];
}


export interface MessageComponentProps {
    text: string;
    isBotResponse: boolean;
}

export interface SaveNewChatProps {
    message: string;
    language: string;
}

export interface UpdateChatProps {
    chatId: number;
    message: string;
    language: string;
}

export interface GeminiRequestProps {
    text: string;
    context?: ChatFormProps[];
    detailLevel: string;
    language: string;
}

export interface UpdateTitleProps {
    title: string;
    chatId: number;
    language: string;
}


export interface GetChatProps {
    chatId: number;
    language: string;
}

export interface DeleteChatProps {
    chatId: number;
    language: string;
}

export interface DeleteAllChatsProps {
    language: string;
}

export interface GetChatsByUserIdProps {
    language: string;
}

export interface ChatHistoryModalProps {
    open: boolean;
    onClose: () => void;
    chats: Chat[];
}

export interface Chat {
    id: number;
    title: string;
}

export interface GetSettingsProps {
    language: string;
}

export interface GetSettingsThunkProps {
    language: string;
}

export interface UpdateSettingsProps {
    language: string;
    theme?: string;
    detailLevel?: string;
    autoSaveChats?: number;
}

export interface UpdateSettingsThunkProps {
    language: string;
    theme?: string;
    detailLevel?: string;
    autoSaveChats?: number;
}

export interface SettingsFormProps {
    theme: string;
    language: string;
    detailLevel: string;
    tempChats: boolean;
}

export interface SettingsForm {
    theme: string;
    language: string;
    detailLevel: string;
    tempChats: boolean;
}

export interface SettingsFormStore {
    theme: string;
    language: string;
    detailLevel: string;
    tempChats: boolean;
}