import { toast } from "react-toastify"
import { DeleteAccountProps, LoginValuesFetchProps, RegisterValuesFetchProps, RequestPasswordResetFetchProps, ResetPasswordFetchProps, sendVerifyEmailProps, VerifyEmailProps } from "../interfaces"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const checkToken = async () => {

  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const resp = await fetch(`${BACKEND_URL}/auth/renew`, {
      method: 'GET',
      credentials: 'include',
    });
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error('Error durante la verificación del token:', error);
  }
};

export const registerUser = async ({ email, password, name, language }: RegisterValuesFetchProps) => {
  try {
    const json = JSON.stringify({ email, password, name });
    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: json
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error durante el registro:', error);
  }
}

export const loginUser = async ({ email, language, password }: LoginValuesFetchProps) => {
  try {
    const json = JSON.stringify({ email, password });
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: json
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error durante el login:', error);
  }
}

export const resetPassword = async ({ formValues, token, language }: ResetPasswordFetchProps) => {

  try {
    const response = await fetch(`${BACKEND_URL}/auth/reset-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify({ token, newPassword: formValues.newPassword })
    });

    const data = await response.json();
    if (!data.ok) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  } catch (error) {
    console.error('Error restableciendo la contraseña:', error);
  }
}

export const sendResetPassword = async ({ formValues, language }: RequestPasswordResetFetchProps) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify(formValues)
    });

    const data = await response.json();
    if (!data.ok) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  } catch (error) {
    console.error('Error solicitando el restablecimiento de contraseña:', error);
  }
}

export const verify = async ({ token, language }: VerifyEmailProps) => {
  let data;
  try {
    const response = await fetch(`${BACKEND_URL}/auth/verify-email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify({ token }),

    });
    data = await response.json();
  } catch (error) {
    console.error('Error verifying email', error);
    data = { ok: false, message: 'Error verifying email' };
  } finally {
    return data;
  }
}

export const sendVerifyEmail = async ({ email, language }: sendVerifyEmailProps) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/request-verified-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();

    if (!data.ok) {
      toast.error(data.message);
    } else {
      toast.success(data.message);
    }
  } catch (error) {
    console.error('Error sending verification email:', error);
    toast.error('Error sending verification email');
  }
}

export const deleteAccount = async ({ language }: DeleteAccountProps) => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/delete-account`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
    });
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error("Error deleting account:", error);
  }
}