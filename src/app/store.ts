import { createStore, combineReducers, applyMiddleware, compose, ThunkAction, Action } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any;
  }
}

const composeEnhancers = 
  ( typeof window !== 'undefined' &&
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) ||
  compose;

 const reducers = combineReducers({
  auth: authReducer
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware( thunk )
  )
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
