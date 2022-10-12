import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            buttonSave="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__item popup__item_field_mesto"
                type="text"
                id="cardName"
                placeholder="Название"
                onChange={handleChangeName}
                value={name}
                required
            />
            <span className="popup__item-error popup__item-error_name cardName-error"></span>
            <input
                className="popup__item popup__item_field_link"
                type="url"
                id="cardLink"
                placeholder="Ссылка на картинку"
                onChange={handleChangeLink}
                value={link}
                required
            />
            <span className="popup__item-error popup__item-error_card-link cardLink-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;