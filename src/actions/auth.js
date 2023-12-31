import axios from "axios";
import Cookies from "js-cookie";
import { load_user } from "./profile";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL
} from "./types";

export const checkAuthenticated = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/authenticated`,
      config
    );
    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      body,
      config
    );
    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
      });

      dispatch(load_user())
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
      payload: false,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    'withCredentials': true,
  });
  
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/logout`,
      body,
      config
    );
    if (res.data.success) {
      dispatch({
          type: LOGOUT_SUCCESS
      });
  } else {
      dispatch({
          type: LOGOUT_FAIL
      });
  }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL
  });
  }
};
export const register = (username, password, email, ) => async (dispatch) => {
  const config = {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get('csrftoken')
    },
  };

  const body = JSON.stringify({ username, password, email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/register`,
      body,
      config,
    );
    if (res.data.error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: false,
      });
    } else {
      dispatch({
        type: REGISTER_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
