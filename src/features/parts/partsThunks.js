import { createAsyncThunk } from '@reduxjs/toolkit';
import { getParts } from '../../services/partsApi';

export const fetchBrands = createAsyncThunk(
  'parts/fetchBrands',
  async (number, { rejectWithValue, signal }) => {
    try {
      const goods = await getParts({ number }, { signal });

      return goods.filter((item) => item?.brand);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }

      return rejectWithValue(error.message);
    }
  },
);

export const fetchOffers = createAsyncThunk(
  'parts/fetchOffers',
  async ({ number, brand }, { rejectWithValue, signal }) => {
    try {
      const goods = await getParts({ number, brand }, { signal });

      return goods
        .flatMap((item) => [item, ...(Array.isArray(item.analogues) ? item.analogues : [])])
        .filter((item) => item?.brand);
    } catch (error) {
      if (error.name === 'AbortError') {
        throw error;
      }

      return rejectWithValue(error.message);
    }
  },
);
