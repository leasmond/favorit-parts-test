import { createSlice } from '@reduxjs/toolkit';
import { fetchBrands, fetchOffers } from './partsThunks';

const initialState = {
  number: '',
  brands: [],
  offers: [],
  selectedBrand: null,
  brandsLoading: false,
  offersLoading: false,
  brandsError: null,
  offersError: null,
  brandsRequestId: null,
  offersRequestId: null,
};

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {
    selectBrand(state, action) {
      state.selectedBrand = action.payload;
      state.offers = [];
      state.offersError = null;
    },

    resetSearch() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение производителей
      .addCase(fetchBrands.pending, (state, action) => {
        state.number = action.meta.arg;
        state.brandsRequestId = action.meta.requestId;
        state.brandsLoading = true;
        state.brandsError = null;
        state.brands = [];
        state.selectedBrand = null;
        state.offers = [];
        state.offersError = null;
        state.offersLoading = false;
        state.offersRequestId = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) return;

        state.brandsLoading = false;
        state.brands = action.payload;
        state.brandsRequestId = null;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        if (state.brandsRequestId !== action.meta.requestId) return;

        state.brandsLoading = false;
        state.brandsRequestId = null;

        if (!action.meta.aborted) {
          state.brandsError = action.payload || action.error.message;
        }
      })

      // Получение аналогов и предложений
      .addCase(fetchOffers.pending, (state, action) => {
        state.offersRequestId = action.meta.requestId;
        state.offersLoading = true;
        state.offersError = null;
        state.offers = [];
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) return;

        state.offersLoading = false;
        state.offers = action.payload;
        state.offersRequestId = null;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        if (state.offersRequestId !== action.meta.requestId) return;

        state.offersLoading = false;
        state.offersRequestId = null;

        if (!action.meta.aborted) {
          state.offersError = action.payload || action.error.message;
        }
      });
  },
});

export const { selectBrand, resetSearch } = partsSlice.actions;

export default partsSlice.reducer;
