import { useEffect } from 'react';

import './PopupWithForm.css';

function PopupWithForm({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="popup popup_opened"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        >
          <span className="popup__close-icon" aria-hidden="true" />
        </button>

        <h2 id="popup-title" className="popup__title">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;