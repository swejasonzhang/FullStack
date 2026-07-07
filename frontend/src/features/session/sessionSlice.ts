import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "@/app/store";
import type { User } from "@/types";
import { csrfFetch, storeCSRFToken } from "@/lib/csrf";

interface SessionState {
  user: User | null;
}

function readStoredUser(): User | null {
  const raw = sessionStorage.getItem("currentUser");
  return raw ? (JSON.parse(raw) as User) : null;
}

function storeCurrentUser(user: User | null): void {
  if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
  else sessionStorage.removeItem("currentUser");
}

const initialState: SessionState = {
  user: readStoredUser(),
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    removeCurrentUser(state) {
      state.user = null;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = sessionSlice.actions;

interface Credentials {
  credential: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const login =
  ({ credential, password }: Credentials) =>
  async (dispatch: AppDispatch): Promise<Response> => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

export const restoreSession =
  () =>
  async (dispatch: AppDispatch): Promise<Response> => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

export const signup =
  ({ username, email, password }: SignupData) =>
  async (dispatch: AppDispatch): Promise<Response> => {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

export const logout =
  () =>
  async (dispatch: AppDispatch): Promise<Response> => {
    const response = await csrfFetch("/api/session", { method: "DELETE" });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
  };

export default sessionSlice.reducer;
