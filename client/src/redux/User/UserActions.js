

import {
    //USER
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE,
  } from "../actionTypes";

//USER Actions

export const userLoginRequest = () => ({
    type: USER_LOGIN_REQUEST,
  });
  
  export const userLoginSuccess = (content) => ({
    type: USER_LOGIN_SUCCESS,
    payload: {
      firstName: content.firstName,
      lastName: content.lastName,
      email: content.email,
      role: content.role,
      isLoggedin : content.ok,
      error : content.error,
    },
  });

  export const userLoginFailure = (error) => ({
    type: USER_LOGIN_FAILURE,
    payload: {
      error,
    },
  });
  
  export const userLogout = () => ({
    type: USER_LOGOUT,
  });

  export function fetchUserData(content) {
    return (dispatch) => {

        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: content.loginEmail, password: content.loginPassword })
        })
        .then(r => r.json())
        .then((data) => {
            console.log(data);
          dispatch(userLoginSuccess(data));
        })
        .catch((error) => {
          console.log(error);
          dispatch(userLoginFailure(error.message));
        });
    };
  }

  export function fetchLogOut(content) {
    return (dispatch) => {

        fetch("/user/deleteCookie", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(),
        })
        .then(r => r.json())
        .then((data) => {
            console.log(data);
          dispatch(userLogout());
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  