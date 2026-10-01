import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SearchForm from './components/SearchForm/SearchForm';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import NewsCardList from './components/NewsCardList/NewsCardList';
import NotFound from './components/NotFound/NotFound';
import SavedNews from './components/SavedNews/SavedNews';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import thirdPartyApi from './utils/ThirdPartyApi';

import './App.css';

function Home({ onLoginClick }) {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setError('');
    setCards([]);

    localStorage.setItem(
      'newsExplorerVisibleCards',
      '3'
    );

    thirdPartyApi
      .getNews(keyword)

      .then((data) => {
        const articles = data.articles || [];

        setCards(articles);

        localStorage.setItem(
          'newsExplorerLastSearch',
          JSON.stringify({
            keyword,
            articles,
          })
        );
      })  
      .catch(() => {
        setError(
          'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.'
        );
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const savedSearch = localStorage.getItem(
      'newsExplorerLastSearch'
    );

    if (!savedSearch) {
      return;
    }

    try {
      const parsedSearch = JSON.parse(savedSearch);

      if (
        parsedSearch &&
        Array.isArray(parsedSearch.articles) &&
        parsedSearch.articles.length > 0
      ) {
        setCards(parsedSearch.articles);
        setHasSearched(true);
      }
    } catch {
      localStorage.removeItem('newsExplorerLastSearch');
    }
  }, []);

  return (
    <div className="page">
      <main className="page__main">
        <section className="page__hero">
          <Header onLoginClick={onLoginClick} />

          <Hero>
            <SearchForm onSearch={handleSearch} />
          </Hero>
        </section>

        {isLoading && <Preloader />}

        {!isLoading && error && (
          <section className="page__error" aria-live="polite">
            <p>{error}</p>
          </section>
        )}

        {!isLoading && !error && hasSearched && cards.length === 0 && (
          <NotFound />
        )}

        {!isLoading && !error && cards.length > 0 && (
          <NewsCardList cards={cards} isLoggedIn={false} />
        )}

        <About />
      </main>

      <Footer />
    </div>
  );
}

function SavedNewsPage({ onLoginClick }) {
  return (
    <div className="page">
      <Header isHome={false} onLoginClick={onLoginClick} />
      
        <SavedNews />

      <Footer />
    </div>
  );
}

function App() {
  const [activePopup, setActivePopup] = useState(null);

  const handleOpenLogin = () => {
    setActivePopup('login');
  };

  const handleOpenRegister = () => {
    setActivePopup('register');
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  return (
    <BrowserRouter>
      <Login
        isOpen={activePopup === 'login'}
        onClose={handleClosePopup}
        onRegisterClick={handleOpenRegister}
      />

      <Register
        isOpen={activePopup === 'register'}
        onClose={handleClosePopup}
        onLoginClick={handleOpenLogin}
      />

      <Switch>
        <Route exact path="/saved-news">
          <SavedNewsPage onLoginClick={handleOpenLogin} />
        </Route>

        <Route exact path="/">
          <Home onLoginClick={handleOpenLogin} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;