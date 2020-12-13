import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";

function App() {
  /* Авторизация/регистрация */
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [email, setEmail] = React.useState(false);
  const history = useHistory();

  /* Проверяем токен при загрузке */
  React.useEffect(() => {
    tokenCheck();
  }, []);

  /* Регистрация пользователя */
  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((data) => {
        if (data.data.email) {
          history.push("/signin");
          setEmail(true);
        }
      })
      .catch((err) => {
        setEmail(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltipOpen(true);
      });
  };
  /* Авторизация */
  const handleLogin = (password, email) => {
    console.log(password, email);
    setUserData({ email: email });
    auth
      .login(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res);
          setUserData({
            email: res.data.email,
          });
          setLoggedIn(true);
        }
      });
    }
  };
  /* Выход */
  const signOut = () => {
    localStorage.removeItem("jwt");
    setUserData([]);
    setLoggedIn(false);
    history.push("/signin");
  };

  const [infoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCardsList()])
      .then((res) => {
        const [dataUser, cardData] = res;

        setCurrentUser(dataUser);

        const item = cardData.map((cardEl) => ({
          link: cardEl.link,
          name: cardEl.name,
          likes: cardEl.likes,
          _id: cardEl._id,
          owner: cardEl.owner,
        }));

        setCards(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCard(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((cardItem) => (cardItem._id === card._id ? newCard : cardItem));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCardArr = cards.filter((cardEl) => cardEl._id !== card._id);
        setCards(newCardArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard, clearForm) {
    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .changeUserData(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData, clearForm) {
    api
      .changeUserAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditAvatarPopupOpen(false);
        clearForm();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopup() {
    setInfoTooltipOpen(false);
    setSelectedCard(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header email={userData.email} onSignOut={signOut} loggedIn={loggedIn} />

      <Switch>
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRoute
            path="/home"
            loggedIn={loggedIn}
            component={Main}
            onCardClick={handleCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>

          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>

          <Route>{loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}</Route>
          <InfoTooltip
            isOpen={infoTooltipOpen}
            onClose={closeAllPopup}
            sucess={email}
            message={
              email ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."
            }
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name={"confirm"}
            title={"Вы уверены?"}
            btnValue={"Да"}
            onClose={closeAllPopup}
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        </CurrentUserContext.Provider>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
