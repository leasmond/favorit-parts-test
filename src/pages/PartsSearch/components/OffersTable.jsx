import { formatPrice } from '../../../shared/utils/formatPrice';

const OffersTableColumns = () => (
  <colgroup>
    <col className="offers-table__col-name" />
    <col className="offers-table__col-brand" />
    <col className="offers-table__col-number" />
    <col className="offers-table__col-warehouse" />
    <col className="offers-table__col-price" />
    <col className="offers-table__col-stock" />
  </colgroup>
);

const OffersTableHead = () => (
  <thead>
    <tr>
      <th>Наименование</th>
      <th>Производитель</th>
      <th>Артикул</th>
      <th>Склад</th>
      <th>Цена</th>
      <th>Остаток</th>
    </tr>
  </thead>
);

const OffersTable = ({ rows }) => (
  <div className="offers-table-wrapper">
    <table className="table offers-table">
      <OffersTableColumns />
      <OffersTableHead />
      <tbody>
        {rows.map((item) => (
          <tr key={item.id}>
            <td className="offers-table__name">{item.name || '—'}</td>
            <td>
              <span className="offers-table__brand">{item.brand || '—'}</span>
            </td>
            <td>{item.number || '—'}</td>
            <td>{item.warehouse || '—'}</td>
            <td className="offers-table__price">{formatPrice(item.price)}</td>
            <td>
              <span
                className={`stock-badge ${
                  Number(item.stock) > 0 ? 'stock-badge--available' : 'stock-badge--empty'
                }`}
              >
                {item.stock ?? 0} шт.
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OffersTable;
