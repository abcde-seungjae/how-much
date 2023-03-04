import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, Middleware } from 'redux';


import userInfoSlice from './feature/userInfoSlice';

import API from 'api';


const API_values = Object.values(API);


const reducerObject = API_values.reduce((acc, cur) => {
  const { reducerPath, reducer } = cur;


  if (!acc[reducerPath]) {
    acc[reducerPath] = {};
  }
  acc[reducerPath] = reducer;
  return acc;
}, {} as { [key: string]: any });


const rootReducer = combineReducers({
  userInfo: userInfoSlice.reducer,
  ...reducerObject,
});


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    const getMiddlewareValue: Middleware[] = Object.values(API).map((item) => item.middleware);


    return getDefaultMiddleware().concat(getMiddlewareValue);
  },
});


export default store;


export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

