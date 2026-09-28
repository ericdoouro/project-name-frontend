import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader" aria-live="polite">
      <div className="preloader__spinner" aria-hidden="true" />
      <p className="preloader__text">Procurando notícias...</p>
    </section>
  );
}

export default Preloader;