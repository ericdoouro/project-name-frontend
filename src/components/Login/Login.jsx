import { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import mainApi from '../../utils/MainApi';

import './Login.css';

function Login({ 
    isOpen, 
    onClose, 
    onRegisterClick,
    onLoginSuccess,
  }) {
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;

    mainApi
    .signin({ email, password })
    .then((data) => {
      onLoginSuccess(data.token);
    })
    .catch((error) => {
      console.error('Erro no login:', error);
    });
  };

    const handleInputChange = (event) => {
      setIsFormValid(event.currentTarget.form.checkValidity());
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
            onChange={handleInputChange}
          />
        </label>

        <label className="auth-form__field">
          <span className="auth-form__label">Senha</span>
          <input
            className="auth-form__input"
            type="password"
            name="password"
            placeholder="••••••••"
            minLength="3"
            required
            onChange={handleInputChange}
          />
        </label>

        <button
          className="auth-form__submit"
          type="submit"
          disabled={!isFormValid}
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
