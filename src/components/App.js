import React from 'react';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  //Создаем хуки, управляющие внутренним состоянием.
  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);

  //Создание обработчика события, который изменяет внутренне состояние 
  function handleEditAvatarClick() {
    onEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    onEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    onAddPlacePopupOpen(true);
  }
  return (
    <div className="App">
    <div className="page">
    <Header/>
    <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
    />
    <Footer/>
    <AddPlacePopup/>
    <ImagePopup/>


    </div>

    <div className="popup popup_type_profile">
      <div className="popup__wrapper">
        <button
          className="popup__close popup__close_type_profile"
          type="button"
        ></button>
        <form
          className="popup__form popup__form_type_profile"
          name="profilePopupForm"
          novalidate
        >
          <h2 className="popup__title">Редактировать профиль</h2>
          <input
            id="name-input"
            type="text"
            className="popup__input popup__input_type_name"
            name="name"
            placeholder="Ваше имя"
            minlength="2"
            maxlength="40"
            required
          />
          <span id="name-input-error" className="popup__input-error"></span>
          <input
            id="occupation-input"
            type="text"
            className="popup__input popup__input_type_occupation"
            name="occupation"
            placeholder="Ваша профессия"
            minlength="2"
            maxlength="200"
            required
          />
          <span
            id="occupation-input-error"
            className="popup__input-error popup__input-error_active"
          ></span>
          <button
            className="popup__save popup__save_inactive"
            type="submit"
            disabled
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>

          <button
            className="popup__save popup__save_inactive"
            type="submit"
            disabled
          >
            Создать
          </button>

    <div className="popup popup_type_delete-card">
      <div className="popup__wrapper">
        <button
          className="popup__close popup__close_delete-card"
          type="button"
        ></button>
        <form
          className="popup__form popup__form_type_delete-card"
          name="cardPopupDelete"
        >
          <h2 className="popup__title">Вы уверены?</h2>
          <button type="submit" className="popup__save">Да</button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_avatar">
      <div className="popup__wrapper">
        <button
          className="popup__close popup__close_delete-card"
          type="button"
        ></button>
        <form
          className="popup__form popup__form_type_avatar"
          name="avatarPopup"
          novalidate
        >
          <h2 className="popup__title">Обновить аватар</h2>
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
          <button type="submit" className="popup__save popup__save_inactive" disabled="true">Сохранить</button>
        </form>
      </div>
    </div>

    <template className="element__template">
      <li className="element">
        <img className="element__photo" src="#" alt="Фотография места" />
        <div className="element__info">
          <h2 className="element__name"></h2>
            <div className="element__rate">
              <button className="element__like" type="button"></button>
              <h3 className="element__number"></h3>
            </div>
          <button className="element__delete" type="button"></button>
        </div>
      </li>
    </template>
    </div>
  );
}

export default App;
