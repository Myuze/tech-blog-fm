import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import fetchComments from './commentAPI';

export interface CommentState {
  id: number;
  content: string;
  blog_id: number;
  author_id: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CommentState = {
  id: NaN,
  content: '',
  blog_id: NaN,
  author_id: NaN,
  status: 'idle',
};

export const commentFetchAsync = createAsyncThunk(
  'comment/fetchComment',
  async () => {
    const response = await fetchComments();

    return response.data;
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<CommentState>) => {
      state = action.payload;
    },
  },
});

export const { addComment } = commentSlice.actions;

export const selectComment = (state: CommentState) => state.id;

export default commentSlice.reducer;
