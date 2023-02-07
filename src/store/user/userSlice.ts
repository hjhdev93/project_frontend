import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  loginType: "naver" | "kakao";
  accessToken: string;
}

interface UserSliceState {
  users: User[];
  status: "fullfiled" | "pending" | "failed";
}

const initialState: UserSliceState = {
  users: [],
  status: "pending",
};

interface LogoutUserInfo {
  id: number;
  loginType: "naver" | "kakao";
}

interface deleteUserInfo extends LogoutUserInfo {}

//  네이버 로그인 요청
export const naverLogin = createAsyncThunk("users/naverLogin", async (code: string | null) => {
  try {
    console.log(code);
    console.log(`${process.env.REACT_APP_NAVER_STATE}`);

    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/naver/login/${code}/${process.env.REACT_APP_NAVER_STATE}`
    );
    console.log(response);

    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  카카오 로그인 요청
export const kakaoLogin = createAsyncThunk("users/kakaoLogin", async (code: string | null) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/auth/kakao/login/${code}`);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  로그아웃 요청
export const logout = createAsyncThunk("users/logout", async (logoutUserinfo: LogoutUserInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/logout/${logoutUserinfo.id}/${logoutUserinfo.loginType}`
    );
    console.log(response);
    console.log(response.data);

    return response.data;
  } catch (err: any) {
    console.log(err.message);
    return;
  }
});

//  회원탈퇴 요청
export const deleteUser = createAsyncThunk("users/deleteUser", async (deleteUserInfo: deleteUserInfo) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/auth/deleteuser/${deleteUserInfo.id}/${deleteUserInfo.loginType}`
    );
    console.log(response);

    return response.data;
  } catch (err: any) {
    console.log(err.message);
    return;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(naverLogin.fulfilled, (state, action) => {
      const newUser = [...state.users, action.payload];
      state.users = newUser;
      state.status = "fullfiled";
    });
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      const newUser = [...state.users, action.payload];
      state.users = newUser;
      state.status = "fullfiled";
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.users = [];
      state.status = "fullfiled";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = [];
      state.status = "fullfiled";
    });
  },
});

export default userSlice;
