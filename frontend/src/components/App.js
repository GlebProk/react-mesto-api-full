import React from 'react';
import api from '../utils/api.js';
import * as apiAuth from '../utils/apiAuth';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Redirect, Switch, useHistory } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});


  const [loggedIn, setloggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('')
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCard()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo.data);
        setCards(initialCards.reverse());
      })
      .catch((err) => {
        console.log(`${err}`);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (loggedIn === true) {
      Promise.all([api.getUserInfo(), api.getInitialCard()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo.data);
          setCards(initialCards.reverse());
        })
        .catch((err) => {
          console.log(`${err}`);
        })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    handleTokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleTokenCheck() {
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setloggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
    }
  }

  function handleLogin(email, password) {
    apiAuth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          handleTokenCheck();
          setloggedIn(true);
          setEmail(email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }

  function handleRegister(email, password) {
    apiAuth.register(email, password)
      .then(() => {
        handleTokenCheck();
        setIsRegistered(true);
      })
      .catch((err) => {
        setIsRegistered(false);
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.patchUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data)
      .then((NewCard) => {
        setCards([NewCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const even = (like) => like === currentUser._id;
    const isLiked = card.likes.some(even);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Карточка не была удалена. Ошибка: ${err}`)
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setloggedIn(false);
    setEmail(null);
    history.push('/signin');
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/signup' />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm name="confirm-message" title="Вы уверены?" buttonSave="Да" />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          isRegistered={isRegistered}
        />
      </CurrentUserContext.Provider>
    </div >
  );

}

export default App;
