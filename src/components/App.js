import React from 'react';
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeleteCardPopup from './DeleteCardPopup.js';
import EditProfilePopup from './EditProfilePopup.js';

//---------------------------------------------------------------------------------------------------------------------

function App() {
  //Создаем хуки, управляющие внутренним состоянием.
  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopup, onDeleteCardPopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});

  const [profilePopupButtonText, setProfilePopupButtonText] = React.useState('Сохранить');
  const [avatarPopupButtonText, setAvatarPopupButtonText] = React.useState('Сохранить');
  const [placePopupButtonText, setPlacePopupButtonText] = React.useState('Создать');
  const [removePopupButtonText, setRemovePopupButtonText] = React.useState('Да');

  //---------------------------------------------------------------------------------------------------------------------

  //Создание обработчика события, который изменяет внутренне состояние 
  function handleEditAvatarClick() {
    onEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    onEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    onAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleCardDeleteClick(card) {
    onDeleteCardPopup(true);
    setCardDelete(card);
  };

  //Функция закрытия всех попапов
  function closeAllPopups() {
    onEditAvatarPopupOpen(false);
    onEditProfilePopupOpen(false);
    onAddPlacePopupOpen(false);
    onDeleteCardPopup(false);
    setCardDelete({link: '',  name: ''});
    setSelectedCard({link: '',  name: ''});
  };

//---------------------------------------------------------------------------------------------------------------------

// Настраиваем хук, который устанавливает колбэки. Функция будет вызвана после того, как будут внесены все изменения в DOM.
// Функция, которая отвечает за закрытие попапов по клику вне формы
  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }
    document.addEventListener('mousedown', handleOverlayClick);

    return() => {
      document.removeEventListener('mousedown', handleOverlayClick);
    }
  }, 
  // колбэк-очистка
  []);

  // Функция, которая отвечает за закрытие попапа нажатием кнопки "escape"
  React.useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener('keyup', handleEscapeClick);

    return () => {
      document.removeEventListener('keyup', handleEscapeClick);
    }
  }, []);


  // Чтение данных с сервера (информация о пользователе + информация о карточках)
  React.useEffect(() => {
    api.getUserInfo(
      // Функция колбэк получает информацию о пользователе в виде объекта
      // Объект содержит свойства: name, about, avatar, _id.
      (user) => {
        //console.log(user);
        setCurrentUser(user);
        // После получения идентификатора пользователя получим карточки 
        api.getCards( 
          // После получения карточек - нарисуем их
          (cards) => {
            //console.log(cards);
            setCards(cards)
          },
          (err) => {
            console.log("В ходе получения карточек возникла ошибка.");
            console.log(err);
          }
        );
      },
      (err) => {
        console.log("В ходе получения информации о пользователе возникла ошибка.");
        console.log(err);
      }
    );
  }, []);

  //---------------------------------------------------------------------------------------------------------------------
  // Установка лайка карточкам
  function handleCardLike(card) {
    // Ввод переменной, где мы проверяем при помощи метода some, удовлетворяет ли какой-либо элемент массива условию, заданному в передаваемой функции.
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLike(card._id, !isLiked, 
      (res) => {
        console.log("Результат выполнения changeLike");
        console.log(res);
        setCards((condition) => condition.map((currentCard) => currentCard._id === card._id ? res : currentCard));
      },
      (err) => {
        console.log("Ошибка в результате выполнения changeLike");
        console.log(err);
      })
  };

  //  Функция удаления карточки: устанавливаем текст на кнопку при удалении карточки
  function handleCardDelete(card) {
    setRemovePopupButtonText('Удаление...')
    // Исключаем из массива удаленную карточку
    const newCards = cards.filter((currentCard) => currentCard._id !== card._id);
    api.deleteCard(card._id, 
      (res) => {
        console.log("Результат выполнения deleteCard");
        console.log(res);
        // Обновляем состояние 
        setCards(newCards);
        closeAllPopups();
      },
      (err) => {
        console.log("Ошибка в результате выполнения deleteCard");
        console.log(err);
      },
      () => {
        setRemovePopupButtonText('Да');
      }
    );
  };

  // Функция обновления пользователя 
  function handleUpdateUser(user) {
    setProfilePopupButtonText('Сохранение...');
    api.editProfile(user, 
      (res) => {
        console.log("Результат выполнения editProfile");
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      },
      (err) => {
        console.log("Ошибка в результате выполнения editProfile");
        console.log(err);
      },
      () => {
        setProfilePopupButtonText('Сохранить');
      });
  };

  // Функция обновления аватара
  function handleUpdateAvatar(avatar) {
    setAvatarPopupButtonText('Сохранение...');
    api.renewAvatar(avatar, // 1й аргумент с типом String (avatarLink в Api.js:renewAvatar)
      (res) => {            // 2й аргумент с типом Function (callback)
        console.log("Результат выполнения renewAvatar");
        console.log(res);
        setCurrentUser(res);
        closeAllPopups();
      },
      (err) => {            // 3й аргумент с типом Function (errback)
        console.log("Ошибка в результате выполнения renewAvatar");
        console.log(err);
      },
      () => {               // 4й аргумент с типом Function (finalback)
        setAvatarPopupButtonText('Сохранить');
      }
    );
  };

  // Функция добавления места 
  function handleAddPlaceSubmit(cardNew) {
    setPlacePopupButtonText('Добавление...');
    api.addCard(cardNew, 
      (res) => {
        console.log("Результат выполнения addCard");
        console.log(res);
        setCards([res, ...cards]);
        closeAllPopups();
      },
      (err) => {
        console.log("Ошибка в результате выполнения addCard");
        console.log(err);
      },
      () => {
        setPlacePopupButtonText('Создать');
      }
    );
  };

  //---------------------------------------------------------------------------------------------------------------------
  return(
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}> {/*текущее значение контекста из ближайшего подходящего Provider выше в дереве компонентов.*/}

    <Header/>

    <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDeleteClick}
      cards={cards}
    />

    <Footer/>

    <EditProfilePopup
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onUpdateUser={handleUpdateUser}
      buttonSubmitText={profilePopupButtonText}
    />
    
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      buttonSubmitText={placePopupButtonText}
      onAddPlace={handleAddPlaceSubmit}
    />

    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
      buttonSubmitText={avatarPopupButtonText}
    />

    <DeleteCardPopup 
      isOpen={isDeleteCardPopup}
      onClose={closeAllPopups}
      onSubmitDeleteCard={handleCardDelete}
      card={cardDelete}
      buttonSubmitText={removePopupButtonText}
    />

    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}
    />

    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
