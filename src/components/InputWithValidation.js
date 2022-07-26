import { useState } from "react";

function InputWithValidation ({isValid, onInputEvent, avatarRef, isDarkTheme, ...props}) {

  const [errorText, setErrorText] = useState('');

  function handleInput(e) {
    onInputEvent(e.target.validity.valid, e.target.name);
    setErrorText(e.target.validationMessage);
  }

  return (
    <>
      <input id={props.id} name={props.id} ref={avatarRef}
        className={`popup__input ${isDarkTheme && 'popup__input_theme_dark'} ${!isValid && 'popup__input_type_error'}`}
        {...props}
        onInput={handleInput}
      />
      <span className={`popup__input-error ${!isValid && 'popup__input-error_visible'}`}
        id={`${props.id}-error`}
      >
        {errorText}
      </span>
    </>
  )
}

export default InputWithValidation;
