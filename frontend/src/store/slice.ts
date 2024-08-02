import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from './createAppSlice';

export interface CryptoCurrencyDetailsState {
  code: string;
  rate: number;
  volume: number;
  cap: number;
  fetchedAt: number;
}

const initialState: CryptoCurrencyDetailsState[] = [];

export const cryptoSlice = createAppSlice({
  name: 'cryptoStore',
  initialState,
  reducers: (create) => ({
    setCryptoData: create.asyncThunk(
      async (cryptoName: string) => {
        const response = await fetch(`http://localhost:3000/api/crypto/${cryptoName}`);
        return await response.json();
      },
      {
        fulfilled: (state, action: PayloadAction<CryptoCurrencyDetailsState[]>) => {
          // if (state.toString() === action.payload.toString()) return;

          state.splice(0, state.length);
          state.push(...action.payload);
        },
      }
    ),
  }),
  selectors: {
    selectedCrypto: (crypto) => crypto,
  },
});

export const { setCryptoData } = cryptoSlice.actions;
export const { selectedCrypto } = cryptoSlice.selectors;

export const cryptoReducer = cryptoSlice.reducer;
