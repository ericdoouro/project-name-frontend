import { useState } from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import mainApi from '../../utils/MainApi';

import './Register.css';

function Register({ 
    isOpen, 
    onClose, 
    onLoginClick,
    onRegisterSuccess,
}) {
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    mainApi
      .signup({ name, email, password })
      .then(() => {
        onRegisterSuccess();
      })
      .catch((error) => {
        console.error('Erro no cadastro:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, validationMessage } = event.currentTarget;

    setIsFormValid(event.currentTarget.form.checkValidity());

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validationMessage,
    }));
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Inscrever-se"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-form__field">
          <span className="auth-form__label">Nome</span>
          <input
            className="auth-form__input"
            type="text"
            name="name"
            placeholder="Seu nome"
            minLength="2"
            maxLength="30"
            required
            onChange={handleInputChange}
          />

          {errors.name && (
            <span className="auth-form__error">
              {errors.name}
            </span>
          )}
        </label>

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

          {errors.email && (
            <span className="auth-form__error">
              {errors.email}
            </span>
          )}
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

          {errors.password && (
            <span className="auth-form__error">
              {errors.password}
            </span>
          )}
        </label>

        <button
          className="auth-form__submit"
          type="submit"
          disabled={!isFormValid}
        >
          Inscrever-se
        </button>

        <p className="auth-form__switch">
          ou{' '}
          <button
            className="auth-form__switch-button"
            type="button"
            onClick={onLoginClick}
          >
            Entrar
          </button>
        </p>
      </form>
    </PopupWithForm>
  );
}

export default Register;