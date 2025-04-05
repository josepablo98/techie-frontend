

export interface RegisterValuesProps {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface RegisterValuesFetchProps extends RegisterValuesProps {
  language: string;
}

export interface LoginValuesProps{
  email: string;
  password: string;
}

export interface LoginValuesFetchProps extends LoginValuesProps {
  language: string;
}

export interface RegisterFetchProps {
  ok: boolean;
  email: string;
  name: string;
  message?: string;
  token?: string;
  verified?: boolean;
}

export interface LoginFetchProps {
  ok: boolean;
  email: string;
  name: string;
  message?: string;
  token?: string;
  verified?: boolean;
}

export interface RequestPasswordResetValuesProps {
  email: string;
}

export interface RequestPasswordResetFetchProps {
  formValues: RequestPasswordResetValuesProps;
  language: string;
}

export interface ResetPasswordValuesProps {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordFetchProps {
  formValues: ResetPasswordValuesProps;
  token: string | null;
  language: string;
}

export interface sendVerifyEmailProps {
  email: string;
  language: string;
}

export interface VerifyEmailProps {
  token: string | null;
  language: string;
}