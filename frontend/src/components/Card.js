import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, likes, name, link, onCardClick, onCardLike, onCardDelete }) {
  const userInfo = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === userInfo._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === userInfo._id);

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'elements__trash' : 'elements__trash_hidden'}`
  );

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'elements__heart elements__heart_active' : 'elements__heart'}`
  );

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
    <div className="elements__element">
      <button
        className="elements__button-image"
        type="button"
        aria-label="image"
        onClick={handleClick}
      >
        <img className="elements__image" src={link} alt={name} />
      </button>
      <div className="elements__group">
        <h2 className="elements__title">{name}</h2>
        <div className="elements__like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="like"
            onClick={handleLikeClick}
          >
          </button>
          <span className="elements__counter">{likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="trash" onClick={handleDeleteClick}></button>
    </div>
  )
}

export default Card;