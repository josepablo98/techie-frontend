
export interface ChatFormProps {
    message: string;
    index: number;
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
}

export interface UpdateChatProps {
    chatId: number;
    message: string;
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
}


export interface GetChatProps {
    chatId: number;
}

export interface DeleteChatProps {
    chatId: number;
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

export interface UpdateSettingsProps {
    theme?: string;
    language?: string;
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
    language: string
    detailLevel: string
    tempChats: boolean
}