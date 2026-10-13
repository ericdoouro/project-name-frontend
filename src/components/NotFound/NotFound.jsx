import './NotFound.css';

function NotFound() {
  return (
    <section className="not-found" aria-live="polite">
      <div className="not-found__container">
        <div className="not-found__icon" aria-hidden="true">
          🔎
        </div>

        <h2 className="not-found__title">
          Nada encontrado
        </h2>

        <p className="not-found__text">
          Infelizmente, sua busca não retornou nenhum resultado.
          Tente procurar por outro tema.
        </p>
      </div>
    </section>
  );
}

export default NotFound;