import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import partsReducer from '../partsSlice';
import { fetchBrands, fetchOffers } from '../partsThunks';
import { getParts } from '../../../services/partsApi';

vi.mock('../../../services/partsApi', () => ({
  getParts: vi.fn(),
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      parts: partsReducer,
    },
  });
};

describe('partsThunks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('должен получать производителей', async () => {
    getParts.mockResolvedValue([
      { brand: 'MEYLE' },
      { brand: 'BOSCH' },
      { name: 'Без производителя' },
    ]);

    const store = createTestStore();
    const result = await store.dispatch(fetchBrands('7160500039S'));

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual([{ brand: 'MEYLE' }, { brand: 'BOSCH' }]);
    expect(getParts).toHaveBeenCalledWith(
      { number: '7160500039S' },
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('должен получать товары и их аналоги', async () => {
    getParts.mockResolvedValue([
      {
        brand: 'MEYLE',
        number: '7160500039S',
        analogues: [
          {
            brand: 'FEBI',
            number: '123456',
          },
        ],
      },
    ]);

    const store = createTestStore();
    const result = await store.dispatch(
      fetchOffers({
        number: '7160500039S',
        brand: 'MEYLE',
      }),
    );

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toHaveLength(2);
    expect(result.payload.map((item) => item.brand)).toEqual(['MEYLE', 'FEBI']);
    expect(getParts).toHaveBeenCalledWith(
      {
        number: '7160500039S',
        brand: 'MEYLE',
      },
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it('должен возвращать ошибку при сбое API', async () => {
    getParts.mockRejectedValue(new Error('Ошибка соединения'));

    const store = createTestStore();
    const result = await store.dispatch(fetchBrands('7160500039S'));

    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('Ошибка соединения');
    expect(store.getState().parts.brandsError).toBe('Ошибка соединения');
  });

  it('должен корректно обрабатывать пустой ответ', async () => {
    getParts.mockResolvedValue([]);

    const store = createTestStore();
    const result = await store.dispatch(fetchBrands('7160500039S'));

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual([]);
    expect(store.getState().parts.brands).toEqual([]);
  });
});
