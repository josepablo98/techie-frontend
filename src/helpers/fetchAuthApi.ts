import { toast } from "react-toastify"
import { CheckTokenProps, RequestPasswordResetFetchProps, ResetPasswordFetchProps, sendVerifyEmailProps, VerifyEmailProps } from "../interfaces"
import { login, startLogout } from "../store/auth"

export const checkToken = async ({ dispatch } : CheckTokenProps) => {
 
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const resp = await fetch('https://localhost:8080/auth/renew', {
        method: 'GET',
        credentials: 'include',
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      dispatch(login(data));
    } catch (error) {
      dispatch(startLogout());
    }
};

export const resetPassword = async ({formValues, token, language} : ResetPasswordFetchProps) => {

  try {
    const response = await fetch('https://localhost:8080/auth/reset-password', {
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

export const sendResetPassword = async ({ formValues, language } : RequestPasswordResetFetchProps) => {
  try {
    const response = await fetch('https://localhost:8080/auth/request-password-reset', {
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

export const verify = async ({ token, language } : VerifyEmailProps) => {
  let data;
  try {
    const response = await fetch('https://localhost:8080/auth/verify-email', {
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

export const sendVerifyEmail = async ({ email, language } : sendVerifyEmailProps)  => {
  try {
    const response = await fetch('https://localhost:8080/auth/request-verified-email', {
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