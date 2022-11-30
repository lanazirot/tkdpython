import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/messages";
import professorsReducer from "./slices/professors";
import loadingReducer from "./slices/loading";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  professor: professorsReducer,
  loading: loadingReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;