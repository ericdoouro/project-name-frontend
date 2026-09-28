import coverImage from '../../images/cover_img.jpg';
import './Hero.css';

function Hero({ children }) {
  return (
    <section className="hero">
      <img
        className="hero__background"
        src={coverImage}
        alt=""
        aria-hidden="true"
      />

      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">
          O que está acontecendo no mundo?
        </h1>

        <p className="hero__description">
          Encontre as últimas notícias sobre qualquer tema e salve elas em
          sua conta pessoal
        </p>

        {children}
      </div>
    </section>
  );
}

export default Hero;