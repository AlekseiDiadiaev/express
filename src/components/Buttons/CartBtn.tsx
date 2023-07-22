import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { Theme } from '../../constatns';
import './buttons.css';
import { setCartIsOpen } from '../../slices/commonSlice';
import { useEffect, useState } from 'react';
import { getCart } from '../../utils/cartServieces';
import CartSVG from '../SVG/CartSVG';

const CartBtn = () => {
    const [numProdInCart, setNumProdInCart] = useState(0);
    const cartTrigger = useAppSelector((state => state.cartTrigger))
    const theme = useAppSelector((state => state.theme))
    const color = theme === Theme.Dark ? 'white' : 'black';
    
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(setCartIsOpen());
    } 
    
    useEffect(() => {
        setNumProdInCart(getCart().length)
    } ,[cartTrigger])

    return (
        <button className="cart-btn header__btn" onClick={handleClick}>
            {numProdInCart ? <div className="cart-btn__counter">{numProdInCart}</div> : null}
            <CartSVG color={color}/>
        </button>
    );
}

export default CartBtn;
