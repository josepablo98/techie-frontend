import { toast } from "react-toastify";
import { RequestPasswordResetValuesProps } from "../interfaces";

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