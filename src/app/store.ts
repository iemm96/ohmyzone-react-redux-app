import { createStore, combineReducers, applyMiddleware, compose, ThunkAction, Action } from '@reduxjs/toolkit';

import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { zoneReducer } from '../reducers/zoneReducer';
import { themeReducer } from '../reducers/themeReducer';
import { uiReducer } from '../reducers/uiReducer';
import { subscriptionReducer } from '../reducers/subscriptionReducer';
import { planReducer } from '../reducers/planReducer';

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
  auth: authReducer,
  subscription: subscriptionReducer,
  theme: themeReducer,
  ui: uiReducer,
  zone: zoneReducer,
  plan: planReducer
});

const rootReducer = (state:any, action:any) => {
  if (action.type === '[Auth] Logout') {
    const { routing } = state
    state = { routing } 
  }
  return reducers(state, action)
}


export const store = createStore(
  rootReducer,
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
