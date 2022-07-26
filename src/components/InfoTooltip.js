import okIcon from '../images/ok.svg';
import errorIcon from '../images/error.svg';

function InfoTooltip({flags, onClose}) {

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  }

  return (
    <div className={`popup ${flags.isOpen && 'popup_opened'}`} onMouseDown={handleOverlayClick} >
      <div className="popup__window popup__window_centered">
        <img alt={flags.isOk ? 'ок' : 'ошибка'} className="popup__icon" src={flags.isOk ? okIcon : errorIcon}/>
        <h2 className="popup__title">{flags.isOk ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
        <button aria-label="Отменить" type="button" className="popup__close-button link" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoTooltip;
