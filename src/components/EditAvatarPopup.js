import PopupWithForm from "./PopupWithForm";
import InputWithValidation from "./InputWithValidation";
import { useRef, useState } from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();
  const [isValid, setIsValid] = useState(false);
  const [isAvatarUrlValid, setIsAvatarUrlValid] = useState(true);

  function handleReset() {
    avatarRef.current.value = '';
    setIsValid(false);
    setIsAvatarUrlValid(true);
  };

  function handleInput(valid) {
    setIsAvatarUrlValid(valid);
    setIsValid(valid);
  }

  function handleSubmit(e) {
    onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitName="Сохранить"
      submitLoadingName="Сохранение..."
      isValid={isValid}
      onReset={handleReset}
    >
      <InputWithValidation
        avatarRef={avatarRef} isValid={isAvatarUrlValid} onInputEvent={handleInput}
        type="url" id="avatar" placeholder="Ссылка на картинку" required />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
