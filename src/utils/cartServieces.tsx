import { IProductData } from "../interfaces";
interface ICartItem {
    id: number;
    count: number;
}

export const addInCart = (productId: number): void => {

    let jsoncart = localStorage.getItem('cart');
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

    const jsonCart = JSON.stringify(cart);
    localStorage.setItem('cart', jsonCart);
}

export const getCart = (): ICartItem[] => {
    const jsonCart = localStorage.getItem('cart')
    if (jsonCart) {
        const cart: ICartItem[] = JSON.parse(jsonCart)
        return cart;
    }
    return []
}

export const removeCartItem = (id: number) => {
    const jsonCart = localStorage.getItem('cart');
    if (!jsonCart) return;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    const index = cart.findIndex(item => +item.id === +id);
    cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const changeNumCartItem = (num: -1 | 1, id: number) => {
    const jsonCart = localStorage.getItem('cart');
    if (!jsonCart) return;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    const index = cart.findIndex(item => +item.id === +id);
    cart[index].count += num;
    if (cart[index].count < 0) cart[index].count = 0;
    localStorage.setItem('cart', JSON.stringify(cart));
}

export const clearBag = () => {
    localStorage.removeItem('cart');
}

export const getTotalBagPrice = (productData: IProductData[]) : number => {
    const jsonCart = localStorage.getItem('cart');
    if(!jsonCart || jsonCart === '[]') return 0;
    const cart: ICartItem[] = JSON.parse(jsonCart);
    console.log(cart)
    let result = 0;
        cart.forEach(item => {
            const index = productData.findIndex(product => product.id === item.id);
            if(index === -1) return 0;
            result += +productData[index].price * item.count;
        })
    return result;
}