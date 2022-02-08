import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

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
    updateModal: (state, action: PayloadAction<BaseModalState>) => {
      state = action.payload;
    },
  },
});

export const { updateModal } = baseModalSlice.actions;

export const selectModalType = (state: RootState) => state.baseModal.type;
export const selectModalId = (state: RootState) => state.baseModal.id;

export default baseModalSlice.reducer;
