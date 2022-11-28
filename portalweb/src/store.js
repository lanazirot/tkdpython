import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/messages";
import professorsReducer from "./slices/professors";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  professor: professorsReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;