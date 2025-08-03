import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonReducer from './selectedPokemonSlice';
import selectedReducer from './selectedSlice';

const store = configureStore({
  reducer: {
    selected: selectedReducer,
    selectedPokemon: selectedPokemonReducer,
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
