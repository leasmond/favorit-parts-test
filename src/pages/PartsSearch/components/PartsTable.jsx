import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OffersTable from './OffersTable';
import OffersPagination from './OffersPagination';
import {
  selectOffers,
  selectOffersError,
  selectOffersLoading,
  selectParts,
} from '../../../features/parts/partsSelectors';
import { fetchOffers } from '../../../features/parts/partsThunks';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { mapOffersToRows } from '../../../shared/utils/mapOffersToRows';

const PartsTable = () => {
  const dispatch = useDispatch();
  const offers = useSelector(selectOffers);
  const isLoading = useSelector(selectOffersLoading);
  const error = useSelector(selectOffersError);
  const { number, selectedBrand } = useSelector(selectParts);
  const [pageSize, setPageSize] = useState(20);
  const offersSectionRef = useRef(null);

  const rows = useMemo(() => mapOffersToRows(offers), [offers]);

  const [pagination, setPagination] = useState({
    page: 1,
    brand: selectedBrand,
  });

  const currentPage = pagination.brand === selectedBrand ? pagination.page : 1;

  const handlePageChange = (page) => {
    setPagination({ page, brand: selectedBrand });
    offersSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPagination({ page: 1, brand: selectedBrand });
  };

  const handleRetry = () => {
    dispatch(fetchOffers({ number, brand: selectedBrand }));
  };

  if (isLoading) {
    return (
      <div className="offers-loading">
        <div className="spinner-border text-primary" />
        <p>Загружаем предложения...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!offers.length) {
    return (
      <div className="alert alert-warning mt-4">
        Предложения по выбранному производителю не найдены.
      </div>
    );
  }

  if (!rows.length) {
    return <div className="alert alert-warning mt-4">Нет доступных предложений на складах.</div>;
  }

  const totalItems = rows.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const visibleRows = rows.slice(startIndex, endIndex);

  return (
    <section ref={offersSectionRef} className="offers-section">
      <div className="offers-section__heading">
        <div>
          <h3>Предложения</h3>
          <p>Доступные товары и складские остатки</p>
        </div>
        <span className="offers-section__count">{totalItems} предложений</span>
      </div>
      <OffersTable rows={visibleRows} />
      <OffersPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </section>
  );
};

export default PartsTable;
