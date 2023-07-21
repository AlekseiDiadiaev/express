import './cart.css';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { changeCartTrigger, setCartIsOpen, setModalIsOpen } from '../../slices/commonSlice';
import MiniCard from '../MiniCard/MiniCard';
import { clearBag, getCart, getTotalBagPrice } from '../../utils/cartServieces';
import { useEffect, useState } from 'react';
import { productsFetched } from '../../slices/asyncThunk';

const Cart = () => {
    const productsData = useAppSelector((state => state.productsData))
    const cartTrigger = useAppSelector((state => state.cartTrigger))
    const cartIsOpen = useAppSelector((state => state.cartIsOpen))
    const [cart, setCart] = useState(getCart())
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if(cartIsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }     
    },[cartIsOpen])

    useEffect(() => {
        setCart(getCart());
    },[cartTrigger])

    const handleClose = () => {
        dispatch(setCartIsOpen());
    }

    const handleSubmit = () => {
        clearBag();
        dispatch(setModalIsOpen(true))
        dispatch(setCartIsOpen());
        dispatch(changeCartTrigger());
    }
    const handleCart = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    }

    const totalPrice = productsData ?  getTotalBagPrice(productsData) : 0;
    
    return (
        <section className={`cart ${cartIsOpen && 'cart_visible'}`} onClick={handleCart}>
            <button className="cart__close" onClick={handleClose}></button>
            <h3 className="cart__title">You cart</h3>
            <div className="cart__cards-wrapper">
                {cart.map(item => {
                    return <MiniCard id={item.id} count={item.count} key={item.id}/>
                })}
            </div>
            <div className="cart__total-price cart__title">${totalPrice}</div>
            <button className="cart__submit" onClick={handleSubmit} disabled={cart.length === 0}>CHECKOUT</button>
        </section>
    );
}

export default Cart;
