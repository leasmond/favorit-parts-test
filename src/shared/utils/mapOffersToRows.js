export const mapOffersToRows = (offers) => {
  return offers.flatMap((item) => {
    const warehouses = Array.isArray(item.warehouses) ? item.warehouses : [];

    return warehouses.map((warehouse, index) => ({
      id: `${item.goodsID}-${warehouse.id || index}`,
      name: item.name,
      brand: item.brand,
      number: item.number,
      price: warehouse.price,
      stock: warehouse.stock,
      warehouse: warehouse.code,
    }));
  });
};
