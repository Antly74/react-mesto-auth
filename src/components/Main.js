import { useState, useEffect, useContext } from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">

      <section className="profile">
        <img alt="Аватар" className="profile__avatar link" onClick={onEditAvatar} src={currentUser.avatar} />
        <h1 className="profile__name">{currentUser.name}</h1>
        <p className="profile__desc">{currentUser.about}</p>
        <button aria-label="Редактировать" type="button" className="profile__edit link" onClick={onEditProfile} />
        <button aria-label="Добавить" type="button" className="profile__add link" onClick={onAddPlace} />
      </section>

      <section className="elements">
        {cards.map(element => (
            <Card key={element._id} card={element}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          )
        )}
      </section>

    </main>
  );
}

export default Main;
