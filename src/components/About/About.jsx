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
          <h2 className="about__title">Sobre o autor</h2>

          <p className="about__text">
            Sou desenvolvedor web formado em Análise e Desenvolvimento de Sistemas, atualmente em formação no bootcamp da TripleTen.
          </p>

          <p className="about__text">
            Tenho foco no desenvolvimento Full Stack, com experiência em React.js, JavaScript, Node.js, Express, APIs REST e MongoDB. Este projeto faz parte da minha jornada de aprendizado e prática no desenvolvimento de aplicações web modernas.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;