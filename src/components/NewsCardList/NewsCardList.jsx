import { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  cards = [],
  isLoggedIn = false,
  onSave,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const handleShowMore = () => {
    setVisibleCards((current) => current + 3);
  };

  const displayedCards = cards.slice(0, visibleCards);

  const hasMoreCards = visibleCards < cards.length;

  return (
    <section className="news-card-list">
      <div className="news-card-list__container">
        <div className="news-card-list__grid">
          {displayedCards.map((card) => (
            <NewsCard
              key={card.url}
              image={card.urlToImage}
              date={card.publishedAt}
              source={card.source?.name}
              title={card.title}
              description={card.description}
              isLoggedIn={isLoggedIn}
              isSaved={card.isSaved}
              keyword={card.keyword}
              onSave={() => onSave?.(card)}
            />
          ))}
        </div>

        {hasMoreCards && (
          <button
            className="news-card-list__more-button"
            type="button"
            onClick={handleShowMore}
          >
            Mostrar mais
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;