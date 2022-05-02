import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import UserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import ProtectedRoute from './ProtectedRoute';
import InfoToolTip from './InfoToolTip';

import imgCorrectPath from '../images/Union.svg';
import imgWrongPath from '../images/False.svg';

function App() {
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [imgPath, setImgPath] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [user, setUser] = React.useState('');
  const nav = useNavigate();

  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = card => setSelectedCard({ name: card.name, link: card.link });

  React.useEffect(() => {
    api
      .getUserInfo()
      .then(userData => setCurrentUser(userData))
      .catch(error => console.log(`WASTED - ${error}`));
    api
      .getArray()
      .then(array => setCards(array))
      .catch(error => console.log(`WASTED - ${error}`));
    api.checkValidity().then(res => {
      console.log(res);
      if (res) {
        setUser(res.data.email);
        setIsLoggedIn(true);
        nav('/');
      }
    });
  }, [isLoggedIn]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  function handleUpdateUser(data) {
    api
      .setInfo(data.name, data.about)
      .then(userData => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(error => console.log(`WASTED - ${error}`));
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data.avatar)
      .then(userData => setCurrentUser(userData))
      .then(() => closeAllPopups())
      .catch(error => console.log(`WASTED - ${error}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then(likedCard => setCards(state => state.map(c => (c._id === card._id ? likedCard : c))))
        .catch(error => console.log(`WASTED - ${error}`));
    } else {
      api
        .removeLike(card._id)
        .then(unlikedCard => setCards(state => state.map(c => (c._id === card._id ? unlikedCard : c))))
        .catch(error => console.log(`WASTED - ${error}`));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => setCards(cards => cards.filter(item => item._id !== card._id)))
      .catch(error => console.log(`WASTED - ${error}`));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card.name, card.link)
      .then(card => setCards([card, ...cards]))
      .then(() => closeAllPopups())
      .catch(error => console.log(`WASTED - ${error}`));
  }

  // killahill@gmail.com
  // 1234

  function handleSignUp(password, email) {
    api
      .signup(password, email)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('id', `${res.data._id}`);
      })
      .then(res => {
        console.log(res);
        setImgPath(imgCorrectPath);
        setTitle('Вы успешно зарегистрировались!');
        setIsInfoToolTipPopupOpen(true);
      })
      .then(() => nav('sign-in'))
      .catch(error => {
        setImgPath(imgWrongPath);
        setTitle('Что-то пошло не так! Попробуйте еще раз.');
        setIsInfoToolTipPopupOpen(true);
        console.log(`Signup error - ${error}`);
      });
  }

  function handleSignIn(password, email) {
    api
      .signin(password, email)
      .then(res => {
        if (res.token) {
          console.log(res);
          localStorage.setItem('token', `${res.token}`);
          setIsLoggedIn(true);
          nav('/');
        }
      })
      .catch(error => {
        setImgPath(imgWrongPath);
        setTitle('Данный пользователь не зарегистрирован.');
        setIsInfoToolTipPopupOpen(true);
        console.log(`Signup error - ${error}`);
      });
  }

  function unlogin() {
    setIsLoggedIn(false);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className='body'>
        <Header email={user} unlogin={unlogin} />
        <Routes>
          <Route path='/' element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
            <Route
              index
              element={
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Route>
          <Route path='sign-up' element={<SignUp onSignup={handleSignUp} />} />
          <Route path='sign-in' element={<SignIn onSignin={handleSignIn} />} />
        </Routes>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCards={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <InfoToolTip isOpen={isInfoToolTipPopupOpen} onClose={closeAllPopups} image={imgPath} title={title} />

        <PopupWithForm id='confirmPopup' title='Вы уверены?' formName='confirmForm' formId='confirmPopupForm' buttonText='Да'></PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
