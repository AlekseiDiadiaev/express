import './buttons.css';
import { useAppSelector } from '../../hooks/reduxTypesHooks';
import { Theme } from '../../constatns';
import { NavLink } from 'react-router-dom';
import HeartSVG from '../SVG/HeartSVG';

const LikeBtn = () => {
    const theme = useAppSelector((state => state.theme))
    const color = theme === Theme.Dark ? 'white' : 'black';

    return (
        <button className="liked-btn header__btn">
            <NavLink to='/liked' className='liked-link'>
                <HeartSVG color={color}/>
            </NavLink>
        </button>
    );
}

export default LikeBtn;
