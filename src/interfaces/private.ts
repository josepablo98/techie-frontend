
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
    token: string;
    message: string;
}

export interface UpdateChatProps {
    chatId: number;
    token: string;
    message: string;
}

export interface GeminiRequestProps {
    text: string;
    context?: ChatFormProps[];
}

export interface UpdateTitleProps {
    title: string;
    token: string;
    chatId: number;
}

export interface GetChatsProps {
    token: string;
}


export interface GetChatProps {
    token: string;
    chatId: number;
}

export interface DeleteChatProps {
    token: string;
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

export interface GetSettingsProps {
    token: string;
}

export interface UpdateSettingsProps {
    token: string;
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

export interface ThemeContextType {
    theme: "light" | "dark";
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}