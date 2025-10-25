import { combineReducers } from "redux";
import {
  SET_TOKEN,
  CLEAR_TOKEN,
  AUTH_ERROR,
  USERS_FETCH_START,
  USERS_FETCH_SUCCESS,
  USERS_FETCH_FAIL,
  USER_CREATE,
  USER_UPDATE,
  USER_DELETE,
} from "./actions";
import { AuthState, UsersState } from "../types";

/* auth type*/
const initialAuth: AuthState = {
  token: localStorage.getItem("token"),
  error: null,
};

/* auth readucer*/
function authReducer(state = initialAuth, action: any): AuthState {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("token", action.payload);
      return { ...state, token: action.payload, error: null };
    case CLEAR_TOKEN:
      localStorage.removeItem("token");
      return { token: null, error: null };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

/* user type*/
const initialUsers: UsersState = {
  items: [],
  loading: false,
  error: null,
};

/* user readucer*/
function usersReducer(state = initialUsers, action: any): UsersState {
  switch (action.type) {
    case USERS_FETCH_START:
      return { ...state, loading: true, error: null };
    case USERS_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case USERS_FETCH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_CREATE:
      return { ...state, items: [action.payload, ...state.items] };
    case USER_UPDATE:
      return {
        ...state,
        items: state.items.map((u) =>
          u.id === action.payload.id ? { ...u, ...action.payload } : u
        ),
      };
    case USER_DELETE:
      return {
        ...state,
        items: state.items.filter((u) => u.id !== action.payload),
      };
    default:
      return state;
  }
}

/* combine readucer*/
export const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
