import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "packages/state/domain/user";

interface UserState {
  user?: User;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, { payload }: PayloadAction<User>) => ({
      user: payload,
    }),
    clearUser: () => {
      return { user: undefined };
    },
  },
  extraReducers: {},
});

export const { setUser, clearUser } = userSlice.actions;
