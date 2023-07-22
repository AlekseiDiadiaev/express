import './header.css';
import Logo from '../Logo/Logo'
import Navigation from '../Navigation/Navigation';
import SearchBar from '../SearchBar/SearchBar';
import LikeBtn from '../Buttons/LikeBtn';
import CartBtn from '../Buttons/CartBtn';
import LightModeBtn from '../Buttons/LightModeBtn';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <Logo/>
                <Navigation/>
                <div className="header__btns-wrapper">
                    <SearchBar/>
                    <LikeBtn/>
                    <CartBtn/>
                    <LightModeBtn/>
                </div>
            </div>
        </header>
    );
}

export default Header;
