import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/messages";
import professorsReducer from "./slices/professors";
import loadingReducer from "./slices/loading";

import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';


const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  timeout: 0,
}

const rootReducer = combineReducers( {
  auth: authReducer,
  message: messageReducer,
  professor: professorsReducer,
  loading: loadingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
})

export const persistor = persistStore(store);