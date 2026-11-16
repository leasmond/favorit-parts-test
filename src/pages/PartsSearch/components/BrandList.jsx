import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffers, fetchBrands } from '../../../features/parts/partsThunks';
import { selectBrand } from '../../../features/parts/partsSlice';
import {
  selectBrands,
  selectBrandsError,
  selectBrandsLoading,
  selectParts,
} from '../../../features/parts/partsSelectors';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const BrandList = () => {
  const dispatch = useDispatch();
  const requestRef = useRef(null);
  const brands = useSelector(selectBrands);
  const { number, selectedBrand } = useSelector(selectParts);
  const isLoading = useSelector(selectBrandsLoading);
  const error = useSelector(selectBrandsError);

  const uniqueBrands = [...new Set(brands.map((item) => item.brand))];

  const handleSelect = (brand) => {
    if (selectedBrand === brand) return;

    requestRef.current?.abort();
    dispatch(selectBrand(brand));
    requestRef.current = dispatch(fetchOffers({ number, brand }));
  };

  const handleRetry = () => {
    dispatch(fetchBrands(number));
  };

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
    };
  }, []);

  if (isLoading) return null;

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!number) return null;

  if (!uniqueBrands.length) {
    return (
      <div className="alert alert-warning mt-4">
        Производители по указанному артикулу не найдены. Попробуйте проверить правильность артикула.
      </div>
    );
  }

  return (
    <section className="brand-section">
      <div className="brand-section__heading">
        <div>
          <h3>Производители</h3>
          <p>Выберите производителя для просмотра предложений</p>
        </div>
        <span className="brand-section__count">{uniqueBrands.length}</span>
      </div>
      <div className="brand-list">
        {uniqueBrands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`brand-card ${selectedBrand === brand ? 'brand-card--active' : ''}`}
            onClick={() => handleSelect(brand)}
          >
            <span className="brand-card__name">{brand}</span>
            <span className="brand-card__action">
              {selectedBrand === brand ? 'Выбран' : 'Выбрать'}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default BrandList;
