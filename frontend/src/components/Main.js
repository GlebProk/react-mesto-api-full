import Card from './Card';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, onCardDelete }) {

  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img className="profile__image" src={userInfo.avatar} alt={`Фотография ${userInfo.name}`} />
        <button className="profile__image-button" onClick={onEditAvatar}></button>
        <div className="profile__info">
          <h1 className="profile__name">{userInfo.name}</h1>
          <h2 className="profile__vocation">{userInfo.about}</h2>
          <button className="profile__edit-button" type="button" aria-label="Edit" onClick={onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="Add" onClick={onAddCard}></button>
      </section>

      <section className="elements">{cards.map((item) => {
        return (
          <Card
            card={item}
            key={item._id}
            link={item.link}
            name={item.name}
            likes={item.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        )
      })}
      </section>
    </main>
  )
}

export default Main;