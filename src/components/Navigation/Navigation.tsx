import './navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {  
    return (
        <nav className="nav">
            <NavLink to="/" className="nav__btn">All</NavLink>
            <NavLink to="/men" className="nav__btn">Men</NavLink>
            <NavLink to="/woman" className="nav__btn">Woman</NavLink>
            <NavLink to="/electronics" className="nav__btn">Electronics</NavLink>
            <NavLink to="/jewelery" className="nav__btn">Jewelery</NavLink>
        </nav>
    );
}

export default Navigation;
