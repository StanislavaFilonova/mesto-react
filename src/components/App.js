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
import Avatar from '../images/Avatar.png'


function App() {
  //Создаем хуки, управляющие внутренним состоянием.
  const [isEditAvatarPopupOpen, onEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, onEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, onAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopup, onDeleteCardPopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({link: '', name: ''});
  const [currentUser, setCurrentUser] = React.useState({
    _id: 0, 
    name: 'Станислава',
    about: 'Frontend Developer',
    avatar: Avatar,
  });

  const [cards, setCards] = React.useState([]);
  const [cardDelete, setCardDelete] = React.useState({});

  const [profilePopupButtonText, setProfilePopupButtonText] = React.useState('Сохранить');
  const [avatarPopupButtonText, setAvatarPopupButtonText] = React.useState('Сохранить');
  const [placePopupButtonText, setPlacePopupButtonText] = React.useState('Создать');
  const [removePopupButtonText, setRemovePopupButtonText] = React.useState('Да');


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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(card) {
    onDeleteCardPopup(true);
    setCardDelete(card);
  }

  //Функция закрытия всех попапов
  function closeAllPopups() {
    onEditAvatarPopupOpen(false);
    onEditProfilePopupOpen(false);
    onAddPlacePopupOpen(false);
    onDeleteCardPopup(false);
    setCardDelete({link: '',  name: ''});
    setSelectedCard({link: '',  name: ''});
  }


// Настраиваем хук, который устанавливает колбэки. Функция будет вызвана после того, как будут внесены все изменения в DOM.
// Функция, которая отвечает за закрытие попапов по клику вне формы
  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target === evt.currentTarget){
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

    return() => {
      document.removeEventListener('keyup', handleEscapeClick);
    }
  }, [])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })

  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    //api
  }
  return (
    <div className="page">
    <CurrentUserContext.Provider value={currentUser}> {/*текущее значение контекста из ближайшего подходящего Provider выше в дереве компонентов.*/}
    <Header/>
    <Main
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace={handleAddPlaceClick}
    />
    <Footer/>
    <AddPlacePopup
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      />
    <EditAvatarPopup
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      />
    <ImagePopup
      card={selectedCard}
      onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
