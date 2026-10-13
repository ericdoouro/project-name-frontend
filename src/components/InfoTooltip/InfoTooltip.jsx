import './InfoTooltip.css';

function InfoTooltip({
  isOpen,
  onClose,
  onLoginClick,
  title = 'Cadastro concluído com sucesso!',
  actionLabel = 'Entrar',
  onAction,
}) {
  if (!isOpen) {
    return null;
  }

  const handleAction = () => {
    onClose();

    if (onAction) {
      onAction();
    }
  };

  return (
    <div
      className="popup popup_opened"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-tooltip-title"
    >
      <div className="popup__container info-tooltip">
        <button
          className="popup__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <span className="popup__close-icon" aria-hidden="true" />
        </button>

        <h2 id="info-tooltip-title" className="info-tooltip__title">
          {title}
        </h2>

        <button
          className="info-tooltip__login-button"
          type="button"
          onClick={handleAction}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default InfoTooltip;