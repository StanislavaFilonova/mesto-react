import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    return(
        <PopupWithForm
            name="avatar"
            button="delete-card"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonSubmitText={props.buttonSubmitText}
        >
                <input
                    id="avatar-input"
                    type="url"
                    className="popup__input popup__input_type_avatar"
                    name="avatar"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span
                    id="avatar-input-error"
                    className="popup__input-error popup__input-error_active"
                ></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;