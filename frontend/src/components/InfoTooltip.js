import React from 'react';
import unionImgTrue from "../images/UnionTrue.png"
import unionImgFalse from "../images/UnionFalse.png"

function InfoTooltip({ isOpen, onClose, isRegistered }) {
    return (
        <div className={isOpen ? `popup popup_opened` : `popup`}>
            <div className="popup__container">
                <button
                    className="popup__button-close"
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                />
                <img
                    className="popup__union"
                    src={isRegistered ? unionImgTrue : unionImgFalse}
                    alt={isRegistered ? 'Картинка успеха' : 'Картинка ошибки'}
                />
                <h2
                    className="popup__info-text">
                    {isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;