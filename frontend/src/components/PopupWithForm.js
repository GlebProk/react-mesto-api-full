import React from 'react';

function PopupWithForm({ isOpen, onClose, name, title, buttonSave, children, onSubmit, isLoading }) {

  return (
    <div className={isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <form
        className="popup__container"
        name={name}
        onSubmit={onSubmit}
      >
        <button
          className="popup__button-close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        >
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          className="popup__button-save"
          type="submit"
          aria-label="Save"
        >
          {buttonSave}
        </button>
      </form>
    </div>
  )

}

export default PopupWithForm;
