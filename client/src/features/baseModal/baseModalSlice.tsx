import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BaseModalState {
  id: string;
  type: 'login' | 'register';
  headerText?: string;
  closeButtonText?: string;
  submitButtonText?: string;
}

const initialState: BaseModalState = {
  id: '',
  type: 'login',
};

export const baseModalSlice = createSlice({
  name: 'baseModal',
  initialState,
  reducers: {
    updateHeaderText: (state, action: PayloadAction<string>) => {
      state.headerText = action.payload;
    },
  },
});

export const { updateHeaderText } = baseModalSlice.actions;

export const selectType = (state: BaseModalState) => state.headerText;

export default baseModalSlice.reducer;
