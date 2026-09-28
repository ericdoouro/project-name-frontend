import './NewsCard.css';

function NewsCard({
  image,
  date,
  source,
  title,
  description,
  isLoggedIn = false,
  isSaved = false,
  keyword,
  onSave,
}) {
  const handleSave = () => {
    if (onSave) {
      onSave();
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {image && (
          <img
            className="news-card__image"
            src={image}
            alt={title}
          />
        )}
        
        {keyword && (
          <span className="news-card__keyword">
            {keyword}
          </span>
        )}

        <button
          className={`news-card__save-button ${
            isSaved ? 'news-card__save-button_saved' : ''
          }`}
          type="button"
          aria-label={
            isSaved ? 'Remover artigo dos salvos' : 'Salvar artigo'
          }
          title={
            !isLoggedIn
              ? 'Faça o login para salvar os artigos.'
              : ''
          }
          data-tooltip={
            !isLoggedIn ? 'Faça o login para salvar os artigos.' : ''
          }
          onClick={handleSave}
        >
          <span className="news-card__save-icon" aria-hidden="true" />
        </button>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{date}</p>

        <h3 className="news-card__title">
          {title}
        </h3>

        <p className="news-card__description">
          {description}
        </p>

        <p className="news-card__source">
          {source}
        </p>
      </div>
    </article>
  );
}

export default NewsCard;