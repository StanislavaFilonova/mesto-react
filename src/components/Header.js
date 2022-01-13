import Vector from '../images/Vector.svg';
/**
 *  Функция: Создание компонента Header, который отвечает за прорисовку логотипа на сайте
 */
function Header() {
    return (
        <header className="header">
            <img src={Vector} alt="Логотип сервиса" className="header__logo"/>
        </header>
    );
}

export default Header;