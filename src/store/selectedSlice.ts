// store/selectedSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  name: string;
  description: string;
  url: string;
}

interface SelectedState {
  selected: SelectedItem[];
}

const initialState: SelectedState = {
  selected: [],
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<SelectedItem>) => {
      const { name } = action.payload;
      const index = state.selected.findIndex(item => item.name === name);
      if (index !== -1) {
        // Remove from selection
        state.selected.splice(index, 1);
      } else {
        // Add to selection
        state.selected.push(action.payload);
      }
    },
    clearSelected: (state) => {
      state.selected = [];
    },
  },
});

export const { toggleSelected, clearSelected } = selectedSlice.actions;
export default selectedSlice.reducer;
