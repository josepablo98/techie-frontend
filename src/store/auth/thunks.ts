import { RegisterValuesFetchProps, LoginValuesFetchProps } from './../../interfaces/public'; "../../interfaces";
import { checkingCredentials, login, logout } from "./authSlice";
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import { clearSettings, setSettings } from '../settings';
import { checkToken, deleteAccount, loginUser, registerUser, sendVerifyEmail } from '../../helpers';
import { DeleteAccountProps } from '../../interfaces';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const startCheckingToken = () => {
  return async (dispatch: AppDispatch) => {
  
    try {
      const data = await checkToken();
      if (!data.ok) {
        return dispatch(startLogout());
      } else {
        return dispatch(login(data));
      }
    } catch (error) {
      console.error(error);
      dispatch(startLogout());
    }
  }
}


export const startRegisteringWithEmailAndPassword = ({ email, password, name, language }: RegisterValuesFetchProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());


    try {
      const data = await registerUser({ email, password, name, language });

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
        return dispatch(startLogout());
      }

      toast.info(data.message);
      return dispatch(startLogout());

    } catch (error) {
      console.error('Error durante el registro:', error);
      dispatch(startLogout());
    }
  }
}

export const startLoginWithEmailAndPassword = ({ email, password, language }: LoginValuesFetchProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());
    try {
      const data = await loginUser({ email, password, language });

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
          return dispatch(startLogout());
        } else {
          toast.error(data.message);
          return dispatch(startLogout());
        }
      }

      toast.success(data.message);

      dispatch(login(data))
    }
    catch (error) {
      console.error('Error durante el login:', error);
      dispatch(startLogout());
    }
  }
}


export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const publicLanguage = localStorage.getItem("publicLanguage") || "es";

      dispatch(setSettings({ language: publicLanguage }));

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
      const data = await deleteAccount({ language });
      if (!data.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        const publicLanguage = localStorage.getItem("publicLanguage") || "es";
        dispatch(setSettings({ language: publicLanguage }));
        dispatch(startLogout());
        dispatch(clearSettings());
      }
    } catch (error) {
      console.error("Error eliminando la cuenta:", error);
      toast.error("Error eliminando la cuenta");
    }
  }
}