export const formatPrice = (price) => {
  if (price == null || !Number.isFinite(Number(price))) {
    return '—';
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  }).format(Number(price));
};
