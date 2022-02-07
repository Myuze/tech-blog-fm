import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CommentState } from '../comments/commentSlice';

import fetchPosts from './postAPI';

export interface PostState {
  id: number;
  title: string;
  content: string;
  author_id: string;
  comments: [number];
  status: 'idle' | 'loading' | 'failed';
}

export interface PostStateArray {
  posts: [PostState];
}

const initialState: PostState = {
  id: NaN,
  title: '',
  content: '',
  author_id: '',
  comments: [NaN],
  status: 'idle',
};

export const blogsFetch = createAsyncThunk('post/fetchPost', async () => {
  const response = await fetchPosts();

  return response.data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    addComment: (state, action: PayloadAction<CommentState>) => {
      state.comments.push(action.payload.id);
    },
    updateContent: (state, action: PayloadAction<PostState>) => {
      state.content = action.payload.content;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(blogsFetch.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(blogsFetch.fulfilled, (state, action) => {
        state.status = 'idle';
        state += action.payload;
      })
      .addCase(blogsFetch.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { updateContent } = postSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectId = (state: RootState) => state.post.id;

export default postSlice.reducer;
