const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const getParts = async ({ number, brand }, { signal } = {}) => {
  const params = new URLSearchParams({
    key: API_KEY,
    number,
  });

  if (brand) {
    params.set('brand', brand);
    params.set('analogues', 'on');
  }

  const response = await fetch(`${API_URL}?${params}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return Array.isArray(data.goods) ? data.goods : [];
};
