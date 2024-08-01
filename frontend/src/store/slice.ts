import { createAppSlice } from './createAppSlice';

export interface CryptoCurrencyDetailsState {
  crypto: string;
  price: {
    code: string;
    rate: number;
    volume: number;
    cap: number;
    fetchedAt: number;
  }[];
}

const initialState: CryptoCurrencyDetailsState = {
  crypto: 'BTC',
  price: [],
};

export const cryptoSlice = createAppSlice({
  name: 'cryptoStore',
  initialState,
  reducers: (create) => ({
    setCryptoData: create.asyncThunk(
      async (cryptoName: string) => {
        const response = await fetch(`http://localhost:3000/api/${cryptoName}`);
        return {
          price: await response.json(),
          crypto: cryptoName,
        };
      },
      {
        fulfilled: (state, action) => {
          state.crypto = action.payload.crypto;
          state.price = action.payload.price;
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
