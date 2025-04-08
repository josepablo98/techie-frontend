// Interfaces auxiliares internas (no exportadas)
interface LanguageProps {
  language: string;
}

interface BaseRegister {
  name: string;
  email: string;
  password: string;
}

interface AuthFetchProps {
  ok: boolean;
  email: string;
  name: string;
  message?: string;
  token?: string;
  verified?: boolean;
}

// Interfaces de usuario exportadas

export interface RegisterValuesProps extends BaseRegister {
  password2: string;
}

export interface RegisterValuesFetchProps extends BaseRegister, LanguageProps {}

export interface LoginValuesProps {
  email: string;
  password: string;
}

export interface LoginValuesFetchProps extends LoginValuesProps, LanguageProps {}

// Al ser las respuestas de registro y login idénticas, usamos un alias
export type RegisterFetchProps = AuthFetchProps;
export type LoginFetchProps = AuthFetchProps;

export interface RequestPasswordResetValuesProps {
  email: string;
}

export interface RequestPasswordResetFetchProps extends LanguageProps {
  formValues: RequestPasswordResetValuesProps;
}

export interface ResetPasswordValuesProps {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordFetchProps extends LanguageProps {
  formValues: ResetPasswordValuesProps;
  token: string | null;
}

export interface sendVerifyEmailProps extends LanguageProps {
  email: string;
}

export interface VerifyEmailProps extends LanguageProps {
  token: string | null;
}
