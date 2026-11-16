import { describe, it, expect, vi, afterEach } from 'vitest';

import { getParts } from './partsApi';

describe('getParts', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('должен возвращать список товаров', async () => {
    const goods = [
      {
        brand: 'MEYLE',
        number: '7160500039/S',
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ goods }),
      }),
    );

    const result = await getParts({
      number: '7160500039S',
    });

    expect(result).toEqual(goods);
  });

  it('должен возвращать пустой массив, если goods отсутствует', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );

    const result = await getParts({
      number: '7160500039S',
    });

    expect(result).toEqual([]);
  });

  it('должен выбрасывать ошибку при HTTP-ошибке', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      }),
    );

    await expect(getParts({ number: '7160500039S' })).rejects.toThrow('Ошибка сервера: 500');
  });

  it('должен передавать производителя и параметр analogues', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ goods: [] }),
    });

    vi.stubGlobal('fetch', fetchMock);

    await getParts({
      number: '7160500039S',
      brand: 'MEYLE',
    });

    const url = new URL(fetchMock.mock.calls[0][0]);

    expect(url.searchParams.get('number')).toBe('7160500039S');
    expect(url.searchParams.get('brand')).toBe('MEYLE');
    expect(url.searchParams.get('analogues')).toBe('on');
  });
});
