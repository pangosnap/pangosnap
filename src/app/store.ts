import { baseApi } from '@/app/baseApi'
import { authReducer } from '@/features/auth/slice/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    //добавляем редюсеры rtk query baseAuthApi
    [baseApi.reducerPath]: baseApi.reducer,
    //добавляем редюсеры redux authSlice
    // auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

// Типы для useSelector и useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
