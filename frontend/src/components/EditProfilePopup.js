import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = React.useState('');
    const [vocation, setVocation] = React.useState('');
    const userInfo = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(userInfo.name);
        setVocation(userInfo.about)
    }, [userInfo, isOpen])

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeVocation(e) {
        setVocation(e.target.value);
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: vocation,
        });
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            buttonSave="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__item popup__item_field_name"
                type="text"
                id="userName"
                placeholder="Имя"
                value={name || ""}
                onChange={handleChangeName}
                required
            />
            <span className="popup__item-error popup__item-error_name userName-error"></span>
            <input
                className="popup__item popup__item_field_vocation"
                type="text"
                id="vocation"
                placeholder="О себе"
                value={vocation || ""}
                onChange={handleChangeVocation}
                required
            />
            <span className="popup__item-error popup__item-error_profile-vocation vocation-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;