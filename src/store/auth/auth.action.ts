import { createAsyncThunk } from "@reduxjs/toolkit";
import { toaster } from "evergreen-ui";
import authService from "../../services/auth/auth.service.ts";
import userService from "../../services/user/user.service.ts";
import { LoginData, RegisterData } from "./../../types/auth.types";

export const login = createAsyncThunk(
  "auth/user",
  async (userData: LoginData, thunkAPI) => {
    try {
      const data = await authService.login(userData);
      console.log("from login action", data);
      toaster.success(`С возвращением, ${data.user.username}!`);
      return data.user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toaster.danger(
        error?.response ? error?.response?.data : "Сервер не отвечает"
      );
      console.log("It's error -> ", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerHandler = createAsyncThunk(
  "register/user",
  async (userData: RegisterData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      console.log("from register action", data);
      toaster.success(`Добро пожаловать, ${data.user.username}!`);
      return data.user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("It's error -> ", error);
      toaster.danger(
        error?.response ? error?.response?.data : "Сервер не отвечает"
      );
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProfile = createAsyncThunk(
  "get/profile",
  async (_, thunkAPI) => {
    try {
      const data = await userService.getProfile();
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
