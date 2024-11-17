import { RegisterFetchProps, LoginFetchProps, LoginValuesProps, RegisterValuesProps } from './../../interfaces/public'; "../../interfaces";
import { checkingCredentials, login, logout } from "./authSlice";
import { AppDispatch } from '../store';
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
        return dispatch(logout(data));
      }

      localStorage.setItem('token', data.token!);

      dispatch(login(data));
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
        Swal.fire({ icon: 'error', title: 'Error', text: data.message });
        return dispatch(logout(data));
      }
      localStorage.setItem('token', data.token!);
      dispatch(login(data))
    } catch (error) {
      console.error('Error durante el login:', error);
      dispatch(logout({ message: 'Login falló' }));
    }
  }
} 