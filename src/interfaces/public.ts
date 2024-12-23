

export interface RegisterValuesProps {
  name: string;
  email: string;
  password: string;
  password2: string;
}

export interface LoginValuesProps {
  email: string;
  password: string;
}

export interface RegisterFetchProps {
  ok: boolean;
  email: string;
  name: string;
  message?: string;
  token?: string;
}

export interface LoginFetchProps {
  ok: boolean;
  email: string;
  name: string;
  message?: string;
  token?: string;
}

export interface RequestPasswordResetValuesProps {
  email: string;
}

export interface ResetPasswordValuesProps {
  newPassword: string;
  confirmPassword: string;
}