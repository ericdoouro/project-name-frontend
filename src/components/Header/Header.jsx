import { useContext, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './Header.css';
import closeIcon from "../../images/close.svg";
import logoutIcon from "../../images/logout.svg";

function Header({
  isLoggedIn = false,
  userName = 'Elise',
  onLoginClick,
  onLogoutClick,
  isHome = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const isUserLoggedIn = Boolean(currentUser);
  const userNameFromContext = currentUser?.name || 'Elise';

  const handleMenuToggle = () => {
    setIsMenuOpen((state) => !state);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    handleMenuClose();

    if (onLoginClick) {
      onLoginClick();
    }
  };

  const handleLogoutClick = () => {
    handleMenuClose();

    if (onLogoutClick) {
      onLogoutClick();
    }
  };

  return (
    <header
      className={`header ${
        isHome ? 'header_theme_home' : 'header_theme_saved'
      } ${isMenuOpen ? 'header_menu-open' : ''}`}
    >
      <div className="header__container">
        <a className="header__logo" href="/" aria-label="NewsExplorer - início">
          NewsExplorer
        </a>

        <button
          className="header__menu-button"
          type="button"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? (
            <img
              className="header__menu-icon"
              src={closeIcon}
              alt=""
            />
          ) : (
            <span className="header__menu-lines" />
          )}
        </button>

        <nav
          className={`header__navigation ${
            isMenuOpen ? 'header__navigation_visible' : ''
          }`}
          aria-label="Navegação principal"
        >
          <a
            className={`header__link ${
              isHome ? 'header__link_active' : ''
            }`}
            href="/"
            onClick={handleMenuClose}
          >
            Início
          </a>
        
          {(isUserLoggedIn || !isHome) && (
            <a
              className={`header__link ${
                !isHome ? 'header__link_active' : ''
              }`}
              href="/saved-news"
              onClick={handleMenuClose}
            >
              Artigos salvos
            </a>
          )}

          {!isUserLoggedIn ? (
            <button
              className="header__login-button"
              type="button"
              onClick={handleLoginClick}
            >
              Entrar
            </button>
          ) : (
            <button
              className="header__user-button"
              type="button"
              onClick={handleLogoutClick}
            >
              <span>{userNameFromContext}</span>
               <img
                  className="header__logout-icon"
                  src={logoutIcon}
                  alt=""
                  aria-hidden="true"
                />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;