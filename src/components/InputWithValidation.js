import { useState } from "react";

function InputWithValidation ({isValid, onInputEvent, avatarRef, ...props}) {

  const [errorText, setErrorText] = useState('');

  function handleInput(e) {
    onInputEvent(e.target.validity.valid);
    setErrorText(e.target.validationMessage);
  }

  return (
    <>
      <input id={props.id} name={props.id} ref={avatarRef}
        className={`popup__input ${!isValid && 'popup__input_type_error'}`}
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

// inputErrorClass: 'popup__input_type_error',
// errorClass: 'popup__input-error_visible'
