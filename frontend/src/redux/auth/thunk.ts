import { AppDispatch } from "../../store";
import { failedLoginAction, loginAction, logoutAction } from "./action";

const { REACT_APP_API_SERVER } = process.env;

export function loginThunk(username: string, password: string) {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`${REACT_APP_API_SERVER}/login`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await res.json();
        if (result.success) {
            dispatch(loginAction(result.data.id, result.data.username));
            localStorage.setItem("token", result.token);
        } else {
            dispatch(failedLoginAction());
        }
    }
}

export function logout() {
    return async (dispatch: AppDispatch) => {
      localStorage.removeItem('token');
      dispatch(logoutAction());
    };
  }

export function retriveLogin() {
    return async (dispatch: AppDispatch) => {
        const token = localStorage.getItem('token');
        if (token) {
            const res = await fetch(`${process.env.REACT_APP_API_SERVER}/login/userRetrieval`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                },
              })
              const data = await res.json();
              if (data.payload) {
                  dispatch(loginAction(data.payload.id, data.payload.username));
              }
        } else {
            dispatch(logoutAction());
        }
    }
}