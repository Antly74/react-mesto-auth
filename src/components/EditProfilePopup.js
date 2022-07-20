import PopupWithForm from "./PopupWithForm";
import InputWithValidation from "./InputWithValidation";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = useState('');
  const [description, setDesciption] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name || '');
    setDesciption(currentUser.about || '');
    // если так:
    //   setName(currentUser.name);
    //   setDesciption(currentUser.about);
    // то в консоле возникает ошибка
    //   A component is changing a controlled input to be uncontrolled. This is likely caused by the
    //   value changing from a defined to undefined, which should not happen.
    // ЭТО ПОТОМУ ЧТО пользователь может не успеть прогрузиться и тогда будет undefined, поэтому нужно
    // добавить альтернативное значение
  }, [currentUser]);

  function handleReset() {
    setIsValid(false);
    setIsNameValid(true);
    setIsDescriptionValid(true);
    setName(currentUser.name || '');
    setDesciption(currentUser.about || '');
  };

  function handleNameInput(valid) {
    setIsNameValid(valid);
    setIsValid(valid && isDescriptionValid);
  }

  function handleDescriptionInput(valid) {
    setIsDescriptionValid(valid);
    setIsValid(valid && isNameValid);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDesciption(e.target.value);
  }

  function handleSubmit(e) {
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitName="Сохранить"
      submitLoadingName="Сохранение..."
      isValid={isValid}
      onReset={handleReset}
    >
      <InputWithValidation
        isValid={isNameValid} onInputEvent={handleNameInput}
        type="text" id="profileName"
        placeholder="Имя" minLength="2" maxLength="40" required
        value={name} onChange={handleChangeName}
      />
      <InputWithValidation
        isValid={isDescriptionValid} onInputEvent={handleDescriptionInput}
        type="text" id="profileDesc"
        placeholder="Описание" minLength="2" maxLength="200" required
        value={description} onChange={handleChangeDescription}
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup;
