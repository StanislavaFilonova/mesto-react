import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <div className="page">
      <header className="header">
        <img
          src="./images/Vector.svg"
          alt="Логотип сервиса"
          className="header__logo"
        />
      </header>
      <main className="content">
        <section className="profile">
          <button className="profile__button">
            <img
            className="profile__avatar"
            src="#"
            alt="Аватарка пользователя"
          />
          </button>
          <div className="profile__info">
            <h1 className="profile__user-name"></h1>
            <button className="profile__edit-button" type="button"></button>
            <p className="profile__occupation"></p>
          </div>
          <button className="profile__add-button" type="button"></button>
        </section>

        <section className="elements"></section>
      </main>
      <footer className="footer">
        <p className="footer__author">©&nbsp;2022&nbsp;Mesto&nbsp;Russia</p>
      </footer>
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

    <div className="popup popup_type_new-card">
      <div className="popup__wrapper">
        <button
          className="popup__close popup__close_type_card"
          type="button"
        ></button>
        <form
          className="popup__form popup__form_type_card"
          name="cardPopupForm"
          novalidate
        >
          <h2 className="popup__title">Новое место</h2>
          <input
            id="placename-input"
            type="text"
            className="popup__input popup__input_type_placename"
            name="name"
            placeholder="Название"
            minlength="2"
            maxlength="30"
            autocomplete="off"
            required
          />
          <span
            id="placename-input-error"
            className="popup__input-error popup__input-error_active"
          ></span>
          <input
            id="imageLink-input"
            type="url"
            className="popup__input popup__input_type_imagelink"
            name="link"
            placeholder="Ссылка на картинку"
            autocomplete="off"
            required
          />
          <span
            id="imageLink-input-error"
            className="popup__input-error popup__input-error_active"
          ></span>
          <button
            className="popup__save popup__save_inactive"
            type="submit"
            disabled
          >
            Создать
          </button>
        </form>
      </div>
    </div>

    <div className="popup popup_type_image">
      <div className="popup__wrapper popup__wrapper_type_image">
        <button
          className="popup__close popup__close_type_image"
          type="button"
        ></button>
        <img
          className="popup__image"
          src="#"
          alt="Фотография достопримечательности"
        />
        <p className="popup__caption"></p>
      </div>
    </div>

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
