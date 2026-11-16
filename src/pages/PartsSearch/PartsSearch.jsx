import { useSelector } from 'react-redux';
import AppHeader from '../../components/AppHeader/AppHeader';
import PartSearchForm from './components/PartSearchForm';
import BrandList from './components/BrandList';
import PartsTable from './components/PartsTable';
import { selectSelectedBrand } from '../../features/parts/partsSelectors';
import './PartsSearch.css';

const PartsSearch = () => {
  const selectedBrand = useSelector(selectSelectedBrand);

  return (
    <>
      <AppHeader />
      <main className="parts-page">
        <div className="container">
          <div className="parts-page__heading">
            <span className="parts-page__eyebrow">FAVORIT PARTS / ПОИСК</span>
            <h1 className="parts-page__title">Поиск автозапчастей</h1>
            <p className="parts-page__description">
              Найдите нужную деталь, сравните производителей и выберите лучшее предложение.
            </p>
          </div>
          <section className="parts-search">
            <div className="parts-search__heading">
              <div>
                <h2>Подбор запчастей</h2>
                <p>Введите артикул для поиска производителей</p>
              </div>
            </div>
            <PartSearchForm />
            <BrandList />
            {selectedBrand && <PartsTable />}
          </section>
        </div>
      </main>
    </>
  );
};

export default PartsSearch;
