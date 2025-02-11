import { RegisterFetchProps, LoginFetchProps, LoginValuesProps, RegisterValuesProps } from './../../interfaces/public'; "../../interfaces";
import { checkingCredentials, login, logout } from "./authSlice";
import { AppDispatch } from '../store';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';

export const startRegisteringWithEmailAndPassword = ({ email, password, name }: RegisterValuesProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const json = JSON.stringify({ email, password, name });
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
              const response = await fetch('http://localhost:8080/auth/request-verified-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
              });

              const data = await response.json();

              if (!data.ok) {
                return toast.error(data.message);
              }

              toast.success(data.message);
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

export const startLoginWithEmailAndPassword = ({ email, password }: LoginValuesProps) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials());

    try {
      const json = JSON.stringify({ email, password });
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
              const response = await fetch('http://localhost:8080/auth/request-verified-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
              });

              const data = await response.json();

              if (!data.ok) {
                return toast.error(data.message);
              }

              toast.success(data.message);
            }
          });
          return dispatch(logout(data));
        } else {
          toast.error(data.message);
          return dispatch(logout(data));
        }
      }
      localStorage.setItem('token', data.token!);

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
    localStorage.removeItem('token');
    dispatch(logout({ message: 'Sesión cerrada' }));
  }
}