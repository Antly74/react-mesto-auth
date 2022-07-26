import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import InfoTooltip from './InfoTooltip';
import { Route, Redirect, Switch, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import { auth } from '../utils/Auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [card2Delete, setCard2Delete] = useState({});
  const [currentUser, setCurrentUser] = useState({loggedIn: false});
  const [cards, setCards] = useState([]);
  const [flagsInfoTooltip, setFlagsInfoTooltip] = useState({isOpen: false, isOk: true});

  const history = useHistory();
  const location = useLocation();

  // при подключении компонената
  useEffect(() => {

    // проверим токен
    if (localStorage.getItem('token')) {
      auth.getUserInfo(localStorage.getItem('token'))
      .then((data) => {
        setCurrentUser(curr => {return {...curr, loggedIn: true, email: data.data.email}});
      })
    }

    // получаем инфо пользователя
    api.getUserInfo()
      .then((info) => {
        setCurrentUser(curr => {return {...curr, ...info}});
      })
      .catch(err => console.log(err));

    // инициализируем карточки
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (location.pathname === '/sign-out') {
      localStorage.removeItem('token');
      setCurrentUser(curr => {return {...curr, loggedIn: false, email: ''}});
    }
  }, [location]);

  // закрытие попапа при нажатии на Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      selectedCard._id !== undefined ||
      card2Delete._id !== undefined ||
      flagsInfoTooltip.isOpen
      )
    {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isAddPlacePopupOpen, isEditAvatarPopupOpen, isEditProfilePopupOpen, selectedCard, card2Delete, flagsInfoTooltip])

  useEffect(() => {
    if (flagsInfoTooltip.isOpen && flagsInfoTooltip.isOk) {
      return () => {
        history.push('/sing-in');
      };
    }
  }, [flagsInfoTooltip]);

  useEffect(() => {
    if (currentUser.loggedIn) {
      history.push('/');
    } else {
      history.push('/sign-in');
    }
  }, [currentUser.loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setCard2Delete({});
    setSelectedCard({});
    setFlagsInfoTooltip(curr => {return {isOpen: false, isOk: curr.isOk}});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.patchUserInfo({name, about})
      .then((info) => {
        setCurrentUser(curr => {return {...curr, ...info}});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.patchAvatar(avatar)
      .then((info) => {
        setCurrentUser(curr => {return {...curr, ...info}});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  // обработчик лайка/дизлайка карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLikes(card._id, isLiked)
      .then((newCard) => {
        // создаем новый state на основе текущего state: подменяем одну карточку в массиве
        // при асинхронном выполнении необходимо устанавливать state через колбэк
        // таким образом обеспечивается синхронный доступ к state, в случае медленной сети и быстрыми
        // нажатиями пользователя.
        // так неправильно: setCards(cards.map((c) => c._id === card._id ? newCard : c)); такой вызов пойдет только при синхронной работе
        setCards(currentCards => currentCards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDeleteClick(card) {
    setCard2Delete(card);
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(currentCards => currentCards.filter((c) => c._id !== card._id))
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlace({name, link}) {
    api.postCard({name, link})
      .then((card) => {
        setCards(currentCards => [card, ...currentCards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function openInfoTooltip (isOk) {
    setFlagsInfoTooltip({isOk, isOpen: true});
    // ставим таймер на автоматическое закрытие
    setTimeout(() => {
      setFlagsInfoTooltip(curr => {
        if (curr.isOpen) {
          return {isOpen: false, isOk: curr.isOk}
        } else {
          return curr; // иначе возвращаем то же самое, чтобы не перерисовывалось
        }
      });
    }, 4000);
  }

  function handleRegister({email, password}, onEndLoading) {
    auth.register({email, password})
      .then(() => {
        openInfoTooltip(true);
      })
      .catch(() => {
        openInfoTooltip(false);
      })
      .finally(() => {onEndLoading()});
  }

  function handleLogin({email, password}, onEndLoading) {
    auth.login({email, password})
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser(curr => {return {...curr, loggedIn: true, email}});
      })
      .catch(() => {
        openInfoTooltip(false);
      })
      .finally(() => {onEndLoading()});
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Switch>
          <ProtectedRoute
            exact path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {currentUser.loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
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
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <ConfirmDeletePopup
          card={card2Delete}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <InfoTooltip
          flags={flagsInfoTooltip}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
