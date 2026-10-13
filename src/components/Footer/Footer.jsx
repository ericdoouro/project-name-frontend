import githubLogo from '../../images/logo_github.svg';
import facebookLogo from '../../images/logo_facebook.svg';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
          © 2026 News Explorer | Created by Eric do Ouro
        </p>
        
        <nav className="footer__navigation" aria-label="Links do rodapé">
          <a className="footer__link" href="/">
            Início
          </a>

          <a
            className="footer__link"
            href="https://tripleten.com/"
            target="_blank"
            rel="noreferrer"
          >
            TripleTen
          </a>

          <a
            className="footer__social-link"
            href="https://github.com/ericdoouro"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img
              className="footer__social-icon"
              src={githubLogo}
              alt="GitHub"
            />
          </a>

          <a
            className="footer__social-link"
            href="https://www.facebook.com/ericdoouro.29/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <img
              className="footer__social-icon"
              src={facebookLogo}
              alt="Facebook"
            />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;