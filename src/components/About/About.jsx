import meditationImage from '../../images/meditation.jpg';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__avatar">
          <img
            className="about__image"
            src={meditationImage}
            alt="Imagem de Mulher Meditando"
          />
        </div>

        <div className="about__content">
          <h2 className="about__title">Sobre a autora</h2>

          <p className="about__text">
            Esta é uma seção sobre a autora do projeto NewsExplorer.
          </p>

          <p className="about__text">
            Aqui podemos apresentar informações sobre sua experiência e
            trajetória.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;