import { useState, useEffect } from "react";

function PopupWithForm ({title, name, children, isOpen, onClose, onSubmit, submitName, submitLoadingName, isValid, onReset}) {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // при плавном закрытии необходимо, чтобы reset выполнился после полного исчезновения формы
      setTimeout(() => {
        setIsLoading(false);
        onReset();
      }, 500);
    }
  }, [isOpen, onReset]);

  // закрытие при нажатии на оверлей
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    onSubmit(e);
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onMouseDown={handleOverlayClick} >
      <div className="popup__window">
        <h2 className="popup__header">{title}</h2>
        <form className="popup__form" name={name} noValidate onSubmit={handleSubmit}>
          {children}
          <button
            aria-label={submitName}
            type="submit"
            className={`popup__save-button link ${!isValid && 'popup__save-button_disabled'}`}
            name="submit"
            disabled={!isValid}
          >
            {isLoading ? submitLoadingName : submitName}
          </button>
        </form>
        <button aria-label="Отменить" type="button" className={"popup__close-button link"} onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;
