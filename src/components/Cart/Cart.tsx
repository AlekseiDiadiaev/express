import './cart.css';
import img from '../../assets/img/error.png'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { setCartIsOpen } from '../../slices/commonSlice';
import MiniCard from '../MiniCard/MiniCard';
import { getCart, getTotalBagPrice } from '../../utils/cartServieces';
import { useEffect } from 'react';
import { productsFetched } from '../../slices/asyncThunk';

const Cart = () => {
    const productsData = useAppSelector((state => state.productsData))
    const cartTrigger = useAppSelector((state => state.cartTrigger))
    const cartIsOpen = useAppSelector((state => state.cartIsOpen))
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (productsData) return;
        dispatch(productsFetched())
    }, [dispatch, productsData])

    const handleClose = () => {
        dispatch(setCartIsOpen());
    }
    const cart = getCart();
    const totalPrice = productsData ?  getTotalBagPrice(productsData) : 0;

    return (
        <section className={`cart ${cartIsOpen && 'cart_visible'}`}>
            <button className="cart__close" onClick={handleClose}></button>
            <h3 className="cart__title">You cart</h3>
            <div className="cart__cards-wrapper">
                {cart.map(item => {
                    return <MiniCard id={item.id} count={item.count} key={item.id}/>
                })}
            </div>
            <div className="cart__total-price cart__title">${totalPrice}</div>
            <button className="cart__submit">CHECKOUT</button>
        </section>
    );
}

export default Cart;
