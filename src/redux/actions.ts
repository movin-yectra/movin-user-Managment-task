import { Dispatch } from "redux";
import {
  loginApi,
  getUsersPage,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from "../api/reqres";
import { User } from "../types";

/* Auth action types */
export const SET_TOKEN = "SET_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";
export const AUTH_ERROR = "AUTH_ERROR";

/* Users action types */
export const USERS_FETCH_START = "USERS_FETCH_START";
export const USERS_FETCH_SUCCESS = "USERS_FETCH_SUCCESS";
export const USERS_FETCH_FAIL = "USERS_FETCH_FAIL";
export const USER_CREATE = "USER_CREATE";
export const USER_UPDATE = "USER_UPDATE";
export const USER_DELETE = "USER_DELETE";

/* Auth actions */
export const setToken = (token: string) => ({
  type: SET_TOKEN,
  payload: token,
});
export const clearToken = () => ({ type: CLEAR_TOKEN });
export const authError = (msg: string) => ({ type: AUTH_ERROR, payload: msg });

export const login =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const res = await loginApi(email, password);
      const token = res.data.token;
      dispatch({ type: SET_TOKEN, payload: token });
      localStorage.setItem("token", token);
      return Promise.resolve(token);
    } catch (err: any) {
      const msg = err.response?.data?.error || "Login failed";
      dispatch({ type: AUTH_ERROR, payload: msg });
      return Promise.reject(new Error(msg));
    }
  };

/* Users actions */
export const fetchUsersStart = () => ({ type: USERS_FETCH_START });
export const fetchUsersSuccess = (payload: User[]) => ({
  type: USERS_FETCH_SUCCESS,
  payload,
});
export const fetchUsersFail = (msg: string) => ({
  type: USERS_FETCH_FAIL,
  payload: msg,
});

export const fetchAllUsers = () => async (dispatch: Dispatch) => {
  dispatch(fetchUsersStart());
  try {
    let page = 1;
    let all: User[] = [];
    while (true) {
      const res = await getUsersPage(page);
      const data = res.data;
      if (!data?.data?.length) break;
      all = all.concat(data.data);
      if (page >= data.total_pages) break;
      page++;
    }
    dispatch(fetchUsersSuccess(all));
    return Promise.resolve(all);
  } catch (err: any) {
    dispatch(fetchUsersFail(err?.message || "Failed to fetch users"));
    return Promise.reject(err);
  }
};

export const createUser =
  (payload: Partial<User>) => async (dispatch: Dispatch) => {
    try {
      await createUserApi(payload);
      // reqres does not persist: generate local id
      const user = { ...payload, id: Date.now() } as User;
      dispatch({ type: USER_CREATE, payload: user });
      return Promise.resolve(user);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const updateUser =
  (id: number, payload: Partial<User>) => async (dispatch: Dispatch) => {
    try {
      await updateUserApi(id, payload);
      const updated = { id, ...payload } as User;
      dispatch({ type: USER_UPDATE, payload: updated });
      return Promise.resolve(updated);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteUser = (id: number) => async (dispatch: Dispatch) => {
  try {
    await deleteUserApi(id);
    dispatch({ type: USER_DELETE, payload: id });
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
