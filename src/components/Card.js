import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__caption-text">{card.name}</h2>
        <div className="element__like-block">
          <button aria-label="Лайк" type="button" className={`element__button-like link ${isLiked && 'element__button-like_active'}`} onClick={handleLikeClick} />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn ? <button aria-label="Удалить" type="button" className="element__button-delete link" onClick={handleDeleteClick} /> : ''}
    </article>
  );
}

export default Card;
