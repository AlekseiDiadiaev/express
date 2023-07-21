import { IProductData } from "../interfaces";
interface ICartItem {
    id: number;
    count: number;
}

const CART = 'cart'

export const addInCart = (productId: number): void => {

    let jsoncart = localStorage.getItem(CART);
    let cart: ICartItem[];

    if (!jsoncart) {
        cart = [{
            id: productId,
            count: 1
        }]
    } else {
        cart = JSON.parse(jsoncart)
        const index = cart.findIndex(item => item.id === productId)

        if (index === -1) {
            cart = [...cart, {
                id: productId,
                count: 1
            }]
        } else {
            cart[index].count++
        }
    }

    const jsonNewCart = JSON.stringify(cart);
    localStorage.setItem(CART, jsonNewCart);
}

export const getCart = (): ICartItem[] => {
    const jsonCart = localStorage.getItem(CART)
    if (jsonCart) {
        const cart: ICartItem[] = JSON.parse(jsonCart)
        return cart;
    }
    return []
}

export const removeCartItem = (id: number) => {
    const jsonCart = localStorage.getItem(CART);
    if (!jsonCart) return;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    const index = cart.findIndex(item => +item.id === +id);
    cart.splice(index, 1)
    localStorage.setItem(CART, JSON.stringify(cart));
}

export const changeNumCartItem = (num: -1 | 1, id: number) => {
    const jsonCart = localStorage.getItem(CART);
    if (!jsonCart) return;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    const index = cart.findIndex(item => +item.id === +id);
    cart[index].count += num;
    if (cart[index].count < 0) cart[index].count = 0;
    localStorage.setItem(CART, JSON.stringify(cart));
}

export const clearBag = () => {
    localStorage.removeItem(CART);
}

export const getTotalBagPrice = (productData: IProductData[]): number => {
    const jsonCart = localStorage.getItem(CART);
    if (!jsonCart || jsonCart === '[]') return 0;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    let result = 0;
    cart.forEach(item => {
        const index = productData.findIndex(product => product.id === item.id);
        if (index === -1) return 0;
        result += +productData[index].price * item.count;
    })
    
    return +result.toFixed(2);
}