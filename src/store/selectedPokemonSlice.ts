// src/store/selectedPokemonSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedPokemonState {
  name: string | null;
}

const initialState: SelectedPokemonState = {
  name: null,
};

const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearSelectedPokemon: (state) => {
      state.name = null;
    },
  },
});

export const { setSelectedPokemon, clearSelectedPokemon } = selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;