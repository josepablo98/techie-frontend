import { RegisterFetchProps, LoginFetchProps, RegisterValuesFetchProps, LoginValuesFetchProps } from './../../interfaces/public'; "../../interfaces";
import { checkingCredentials, login, logout } from "./authSlice";
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import { clearSettings, setSettings } from '../settings';
import { sendVerifyEmail } from '../../helpers';
import { DeleteAccountProps } from '../../interfaces';


export const startRegisteringWithEmailAndPassword = ({ email, password, name, language }: RegisterValuesFetchProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const json = JSON.stringify({ email, password, name });
      const response = await fetch('https://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
        body: json
      });

      const data: RegisterFetchProps = await response.json() as RegisterFetchProps;

      if (!data.ok) {
        if (data.verified === false) {
          Swal.fire({
            title: 'Correo no verificado',
            text: 'Debes verificar tu correo para poder acceder',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Reenviar correo',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await sendVerifyEmail({ email, language })
            }
          });
        } else {
          toast.error(data.message);
        }
        return dispatch(logout(data));
      }

      toast.info(data.message);
      return dispatch(logout({ message: 'Debes verificar tu correo' }));
    } catch (error) {
      console.error('Error durante el registro:', error);
      dispatch(logout({ message: 'El registro falló' }));
    }
  }
}

export const startLoginWithEmailAndPassword = ({ email, password, language }: LoginValuesFetchProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const json = JSON.stringify({ email, password });
      const response = await fetch('https://localhost:8080/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
        body: json
      });

      const data: LoginFetchProps = await response.json() as LoginFetchProps;

      if (!data.ok) {
        if (data.verified === false) {
          Swal.fire({
            title: 'Correo no verificado',
            text: 'Debes verificar tu correo para poder acceder',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Reenviar correo',
            cancelButtonText: 'Cancelar'
          }).then(async (result) => {
            if (result.isConfirmed) {
              await sendVerifyEmail({ email, language })
            }
          });
          return dispatch(logout(data));
        } else {
          toast.error(data.message);
          return dispatch(logout(data));
        }
      }

      toast.success(data.message);

      dispatch(login(data))
    } catch (error) {
      console.error('Error durante el login:', error);
      dispatch(logout({ message: 'Login falló' }));
    }
  }
}


export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await fetch("https://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const publicLanguage = localStorage.getItem("publicLanguage") || "es";

      dispatch(setSettings({ language:  publicLanguage }));

      dispatch(logout({ message: "Sesión cerrada" }));
      dispatch(clearSettings());
    } catch (error) {
      console.error("Error durante el logout:", error);
    }
  }
}

export const startDeletingAccount = ({ language }: DeleteAccountProps) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("https://localhost:8080/auth/delete-account", {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      });
      const data = await response.json();

      if (!data.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        const publicLanguage = localStorage.getItem("publicLanguage") || "es";
        dispatch(setSettings({ language: publicLanguage }));
        dispatch(logout({ message: "Cuenta eliminada" }));
        dispatch(clearSettings());
      }
    } catch (error) {
      console.error("Error eliminando la cuenta:", error);
      toast.error("Error eliminando la cuenta");
    }
  }
}