import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query'
import { blogAPI } from './blogAPI';

import postReducer from '../features/posts/postSlice';
import commentReducer from '../features/comments/commentSlice';
import modalReducer from '../features/baseModal/baseModalSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
    baseModal: modalReducer,
    [blogAPI.reducerPath]: blogAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogAPI.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch)
