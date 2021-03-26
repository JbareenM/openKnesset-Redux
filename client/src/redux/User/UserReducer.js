
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_SIGNUP_FAILURE,
  } from "../actionTypes";

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    loading: false,
    error: "",
    isLoggedin: false,
  };

  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          role: action.payload.role,
          loading: false,
          error: "",
          isLoggedin: action.payload.isLoggedin,
        };
      case USER_LOGIN_FAILURE:
        return {
          userFirstName: "",
          userlastName: "",
          userEmail: "",
          userType: "",
          password: "",
          loading: false,
          error: action.payload.error,
        };
      case USER_LOGOUT:
        return {
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          loading: false,
          error: "",
          isLoggedin: false,
        };
  
      default:
        return state;
    }
  };
  
  export default UserReducer;