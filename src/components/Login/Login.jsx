import PopupWithForm from '../PopupWithForm/PopupWithForm';

import './Login.css';

function Login({ isOpen, onClose, onRegisterClick }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Entrar"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-form__field">
          <span className="auth-form__label">E-mail</span>
          <input
            className="auth-form__input"
            type="email"
            name="email"
            placeholder="example@test.com"
            required
          />
        </label>

        <label className="auth-form__field">
          <span className="auth-form__label">Senha</span>
          <input
            className="auth-form__input"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </label>

        <button
          className="auth-form__submit"
          type="submit"
        >
          Entrar
        </button>

        <p className="auth-form__switch">
          ou{' '}
          <button
            className="auth-form__switch-button"
            type="button"
            onClick={onRegisterClick}
          >
            Inscrever-se
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default Login;