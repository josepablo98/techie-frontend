import { toast } from "react-toastify"
import { RequestPasswordResetValuesProps, ResetPasswordValuesProps } from "../interfaces"
import { AppDispatch } from "../store"
import { login, logout } from "../store/auth"

export const checkToken = async (dispatch : AppDispatch) => {
  const token = localStorage.getItem("token")
  if (!token) {
    dispatch(logout({ message: "No token" }))
  } else {
    try {
      const resp = await fetch('http://localhost:8080/auth/renew', {
        method: 'GET',
        headers: {
          'x-token': token
        }
      })
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`)
      }
      const data = await resp.json()
      localStorage.setItem('token', data.token)
      dispatch(login(data))
    } catch (error) {
      localStorage.removeItem('token')
      dispatch(logout({ message: "Invalid token" }))
    }
  }
}

export const resetPassword = async (formValues : ResetPasswordValuesProps, token : string) => {

  try {
    const response = await fetch('http://localhost:8080/auth/reset-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
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

export const sendResetPassword = async (formValues : RequestPasswordResetValuesProps) => {
  try {
    const response = await fetch('http://localhost:8080/auth/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

export const verify = async (token: string) => {
    let data;
    try {
        const response = await fetch("http://localhost:8080/auth/verify-email", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),

        });
        data = await response.json();
    } catch (error) {
        console.error("Error verifying email", error);
        data = { ok: false, message: "Error verifying email" };
    } finally {
        return data;
    }
}