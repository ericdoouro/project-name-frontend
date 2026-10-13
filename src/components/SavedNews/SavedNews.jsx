import { useContext, useEffect, useState } from 'react';

import NewsCard from '../NewsCard/NewsCard';
import mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import './SavedNews.css';

function SavedNews() {
  const currentUser = useContext(CurrentUserContext);
  const [savedCards, setSavedCards] = useState([]);

  const keywords = [...new Set(
    savedCards
      .map((card) => card.keyword)
      .filter(Boolean)
  )];

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return;
    }

    mainApi
      .getArticles(token)
      .then((articles) => {
        setSavedCards(articles);
      })
      .catch((error) => {
        console.error('Erro ao carregar artigos salvos:', error);
      });
  }, []);

  const handleDelete = (articleId) => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return;
    }

    mainApi
      .deleteArticle(articleId, token)
      .then(() => {
        setSavedCards((previousCards) =>
          previousCards.filter((card) => card._id !== articleId)
        );
      })
      .catch((error) => {
        console.error('Erro ao excluir artigo:', error);
      });
  };

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <p className="saved-news__subtitle">Artigos salvos</p>

        <h1 className="saved-news__title">
          {currentUser?.name}, você tem {savedCards.length} artigos salvos
        </h1>

        <p className="saved-news__keywords">
          Por palavras-chave:{' '}
          {keywords.map((keyword, index) => (
            <span className="saved-news__keyword" key={keyword}>
              {keyword}
              {index < keywords.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      </section>

      <section className="saved-news__cards">
        <div className="saved-news__grid">
          {savedCards.map((card) => (
            <NewsCard
              key={card._id}
              image={card.image}
              date={card.date}
              source={card.source}
              title={card.title}
              description={card.text}
              keyword={card.keyword}
              isLoggedIn
              isSaved
              showDelete
              onDelete={() => handleDelete(card._id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default SavedNews;