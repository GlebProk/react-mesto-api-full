import React from 'react';

function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={isOpen ? "popup popup_card-image popup_opened" : "popup popup_card-image"}>
      <figure className="popup__figure">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
        </button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;