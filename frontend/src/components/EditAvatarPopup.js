import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarLinkRef = React.useRef();

    React.useEffect(() => {
        avatarLinkRef.current.value = '';
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarLinkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            buttonSave="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__item popup__item_field_link"
                type="url"
                id="avatarLink"
                placeholder="Ссылка на картинку"
                ref={avatarLinkRef}
                required
            />
            <span className="popup__item-error popup__item-error_avatar-link avatarLink-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;