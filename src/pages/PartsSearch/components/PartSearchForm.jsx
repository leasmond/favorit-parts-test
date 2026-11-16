import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../../features/parts/partsThunks';
import { resetSearch } from '../../../features/parts/partsSlice';
import { selectBrandsLoading } from '../../../features/parts/partsSelectors';

const PartSearchForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectBrandsLoading);
  const [number, setNumber] = useState('');
  const requestRef = useRef(null);

  useEffect(() => {
    return () => {
      requestRef.current?.abort();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = number.trim();

    if (!value) return;

    requestRef.current?.abort();
    dispatch(resetSearch());
    requestRef.current = dispatch(fetchBrands(value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="part-number" className="form-label fw-semibold">
          Артикул запчасти
        </label>

        <input
          id="part-number"
          type="text"
          className="form-control"
          placeholder="Например, 7160500039S"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary btn-lg w-100"
        disabled={isLoading || !number.trim()}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" />
            Поиск...
          </>
        ) : (
          'Найти запчасти'
        )}
      </button>
    </form>
  );
};

export default PartSearchForm;
