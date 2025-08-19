// 'use client'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  // accessToken: string | null
  isLoggedIn: boolean
}

const initialState: AuthState = {
  // accessToken: null,
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {
  // setAccessToken(state, action: PayloadAction<string>) { // вызывается когда нужен новый токен
  //   state.accessToken = action.payload //хранит токен
  //   state.isLoggedIn = true //юзер залогинен
  // },
  // clearCredentials(state) { // юзер сбрасывается
  //   state.accessToken = null
  //   state.isLoggedIn = false
  // },
  // },
  reducers: create => ({
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const {
  // setAccessToken,
  // clearCredentials,
  setIsLoggedIn,
} = authSlice.actions
export const authReducer = authSlice.reducer
export const { selectIsLoggedIn } = authSlice.selectors
