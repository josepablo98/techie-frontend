import { toast } from "react-toastify";
import { ResetPasswordValuesProps } from "../interfaces";


export const resetPassword = async (formValues : ResetPasswordValuesProps, token : string) => {

  try {
    const response = await fetch('http://localhost:8080/auth/reset-password', {
      method: 'POST',
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