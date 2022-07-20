import PopupWithForm from "./PopupWithForm";
import InputWithValidation from "./InputWithValidation";
import { useState } from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isLinkValid, setIsLinkValid] = useState(true);

  function handleReset() {
    setIsValid(false);
    setIsNameValid(true);
    setIsLinkValid(true);
    setName('');
    setLink('');
  };

  function handleNameInput(valid) {
    setIsNameValid(valid);
    setIsValid(valid && isLinkValid);
  }

  function handleLinkInput(valid) {
    setIsLinkValid(valid);
    setIsValid(valid && isNameValid);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    onAddPlace({name, link});
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-element"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitName="Создать"
      submitLoadingName="Создание..."
      isValid={isValid}
      onReset={handleReset}
    >
      <InputWithValidation
        isValid={isNameValid} onInputEvent={handleNameInput}
        type="text" id="elementName"
        placeholder="Название" minLength="2" maxLength="30" required
        value={name} onChange={handleChangeName}
      />
      <InputWithValidation
        isValid={isLinkValid} onInputEvent={handleLinkInput}
        type="url" id="elementLink"
        placeholder="Ссылка на картинку" required
        value={link} onChange={handleChangeLink}
      />
    </PopupWithForm>
);
}

export default AddPlacePopup;
