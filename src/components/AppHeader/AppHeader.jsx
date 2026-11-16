const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <a href="/" className="app-header__logo">
          <span className="app-header__logo-icon">F</span>
          <span>
            FAVORIT<span className="app-header__logo-accent"> PARTS</span>
          </span>
        </a>
        <div className="app-header__caption">Каталог автомобильных запчастей</div>
      </div>
    </header>
  );
};

export default AppHeader;
