import './buttons.css';
import { setTheme } from '../../slices/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { useEffect } from 'react';
import { Theme } from '../../constatns';
import SunSVG from '../SVG/SunSVG';
import MoonSVG from '../SVG/MoonSVG';

const LightModeBtn = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state => state.theme))

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (theme === Theme.Dark) {
            htmlElement.setAttribute('data-theme', Theme.Dark)
        } else {
            htmlElement.setAttribute('data-theme', Theme.Light)
        }
    }, [theme])

    const handleClick = () => {
        theme === Theme.Dark ? dispatch(setTheme(Theme.Light)) : dispatch(setTheme(Theme.Dark));
    }

    return (
        <button className="light-mode-btn header__btn" onClick={handleClick}>
            {theme === Theme.Dark ? <SunSVG/> : <MoonSVG/>}
        </button>
    );
}

export default LightModeBtn;

