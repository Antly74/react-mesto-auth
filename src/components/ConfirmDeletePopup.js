import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({card, onClose, onCardDelete}) {

  function handleSubmit(e) {
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      isOpen={card._id !== undefined}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitName="Да"
      submitLoadingName="Удаление..."
      isValid={true}
      onReset={() => {}}
    />
  );
}

export default ConfirmDeletePopup;
