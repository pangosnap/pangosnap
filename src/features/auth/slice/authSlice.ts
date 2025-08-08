// 'use client'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//
// interface AuthState {
//   accessToken: string | null
//   isLoggedIn: boolean
// }
//
// const initialState: AuthState = {
//   accessToken: null,
//   isLoggedIn: false,
// }
//
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAccessToken(state, action: PayloadAction<string>) { // вызывается когда нужен новый токен
//       state.accessToken = action.payload //хранит токен
//       state.isLoggedIn = true //юзер залогинен
//     },
//     clearCredentials(state) { // юзер сбрасывается
//       state.accessToken = null
//       state.isLoggedIn = false
//     },
//   },
// })
//
// export const { setAccessToken, clearCredentials } = authSlice.actions
// export const authReducer = authSlice.reducer
