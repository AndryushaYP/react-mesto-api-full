import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "../components/Card";

export default function Main({
  onCardClick,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay" onClick={onEditAvatar}>
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__button profile__button_edit"
          ></button>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>

        <button
          onClick={onAddPlace}
          type="button"
          className="profile__button profile__button_add"
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardClick={onCardClick}
              card={card}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
