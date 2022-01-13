function Main({onEditAvatar, onEditProfile, onAddPlace}) {

    return (
        <main className="content">
            <section className="profile">
                <button type="button" aria-label="открыть поле добавления аватара" className="profile__button" onClick={onEditAvatar}>
                <img className="profile__avatar" src="#" alt="Аватарка пользователя"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__user-name"></h1>
                    <button className="profile__edit-button" type="button" aria-label="открыть попап" onClick={onEditProfile}></button>
                    <p className="profile__occupation"></p>
                </div>
                <button className="profile__add-button" type="button" aria-label="открыть поле добавления фото" onClick={onAddPlace}></button>
            </section>

            <section className="elements">

            </section>
        </main>
    )
}


export default Main;