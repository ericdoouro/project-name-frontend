import { useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import SearchForm from './components/SearchForm/SearchForm';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import NewsCardList from './components/NewsCardList/NewsCardList';
import NotFound from './components/NotFound/NotFound';
import thirdPartyApi from './utils/ThirdPartyApi';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    setError('');
    setCards([]);

    thirdPartyApi
      .getNews(keyword)
      .then((data) => {
        setCards(data.articles || []);
      })
      .catch(() => {
        setError(
          'Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.',
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="page">
      <main className="page__main">
        <section className="page__hero">
          <Header />

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
            isLoggedIn={false}
            />
        )}

        <About />
      </main>

      <Footer />
    </div>
  );
}

export default App;