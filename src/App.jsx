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
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import thirdPartyApi from './utils/ThirdPartyApi';
import mainApi from './utils/MainApi';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import CurrentUserContext from './contexts/CurrentUserContext';

import './App.css';

function Home({ 
  onLoginClick, 
  currentUser, 
  onLogout,
  onAlreadySaved, 
}) {

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  

  const handleSave = (article) => {
      const token = localStorage.getItem('jwt');

      if (!token) {
        onLoginClick();
        return;
      }

      const articleData = {
        keyword: article.keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source?.name,
        link: article.url,
        image: article.urlToImage,
      };

      mainApi
        .saveArticle(articleData, token)
        .then(() => {
          setCards((previousCards) =>
            previousCards.map((card) =>
              card.url === article.url
                ? { ...card, isSaved: true }
                : card
            )
          );
        })
        .catch((error) => {
          console.error('Erro ao salvar artigo:', error);
        });
    };

  const markSavedArticles = (articles, token) => {
    if (!token) {
      return Promise.resolve(articles);
    }

    return mainApi
      .getArticles(token)
      .then((savedArticles) => {
        const savedLinks = new Set(
          savedArticles.map((article) => article.link)
        );

        return articles.map((article) => ({
          ...article,
          isSaved: savedLinks.has(article.url),
        }));
      });
  };

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
        const articles = (data.articles || []).map((article) => ({
          ...article,
          keyword,
        }));

        const token = localStorage.getItem('jwt');

          return markSavedArticles(articles, token);
        })
        .then((articles) => {
          setCards(articles);

          localStorage.setItem(
            'newsExplorerLastSearch',
            JSON.stringify({
              keyword: articles[0]?.keyword || '',
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
    const savedSearch = localStorage.getItem('newsExplorerLastSearch');

    if (!savedSearch) return;

    try {
      const parsedSearch = JSON.parse(savedSearch);

      if (
        parsedSearch
        && Array.isArray(parsedSearch.articles)
        && parsedSearch.articles.length > 0
      ) {
        const token = localStorage.getItem('jwt');

        markSavedArticles(parsedSearch.articles, token)
          .then((articles) => {
            setCards(articles);
          });

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
          <Header 
            onLoginClick={onLoginClick}
            onLogoutClick={onLogout}
            isLoggedIn={Boolean(currentUser)}
            userName={currentUser?.name}
          />

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
          <NewsCardList 
            cards={cards} 
            isLoggedIn={Boolean(currentUser)}
            onSave={handleSave}
            onAlreadySaved={onAlreadySaved}
          />
        )}

        <About />
      </main>

      <Footer />
    </div>
  );
}

function SavedNewsPage({ onLoginClick, currentUser, onLogout }) {
  return (
    <div className="page">
      <Header 
        isHome={false} 
        onLogoutClick={onLogout}
        onLoginClick={onLoginClick}
        isLoggedIn={Boolean(currentUser)}
        userName={currentUser?.name}
      />
      
        <SavedNews />

      <Footer />
    </div>
  );
}

function App() {
  const [activePopup, setActivePopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('jwt', token);

    mainApi
      .getUser(token)
      .then((user) => {
        setCurrentUser(user);
        setActivePopup(null);
      })
      .catch((error) => {
        console.error('Erro ao obter usuário:', error);
        localStorage.removeItem('jwt');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    mainApi
      .getUser(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem('jwt');
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
  };

  const handleOpenSuccess = () => {
    setActivePopup('success');
  };

  const handleOpenLogin = () => {
    setActivePopup('login');
  };

  const handleOpenRegister = () => {
    setActivePopup('register');
  };

  const handleClosePopup = () => {
    setActivePopup(null);
  };

  const handleOpenAlreadySaved = () => {
    setActivePopup('already-saved');
  };

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <Login
          isOpen={activePopup === 'login'}
          onClose={handleClosePopup}
          onRegisterClick={handleOpenRegister}
          onLoginSuccess={handleLoginSuccess}
        />

        <Register
          isOpen={activePopup === 'register'}
          onClose={handleClosePopup}
          onLoginClick={handleOpenLogin}
          onRegisterSuccess={handleOpenSuccess}
        />

        <InfoTooltip
          isOpen={
            activePopup === 'success'
            || activePopup === 'already-saved'
          }
          onClose={handleClosePopup}
          title={
            activePopup === 'already-saved'
              ? 'Este artigo já foi salvo.'
              : 'Cadastro concluído com sucesso!'
          }
          actionLabel={
            activePopup === 'already-saved'
              ? 'Entendi'
              : 'Entrar'
          }
          onAction={
            activePopup === 'success'
              ? handleOpenLogin
              : undefined
          }
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/saved-news"
            isLoggedIn={Boolean(currentUser)}
            isAuthLoading={isAuthLoading}
            onUnauthorized={handleOpenLogin}
          >
            
            <SavedNewsPage
              onLoginClick={handleOpenLogin}
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          </ProtectedRoute>

          <Route exact path="/">
            <Home
              onLoginClick={handleOpenLogin}
              currentUser={currentUser}
              onLogout={handleLogout}
              onAlreadySaved={handleOpenAlreadySaved} 
            />
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;