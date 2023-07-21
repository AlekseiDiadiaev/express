
import { useEffect, useState } from 'react';
import './miniCard.css';
import { IProductData } from '../../interfaces';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getSingleProduct } from '../../api/dataApi';
import { changeNumCartItem, removeCartItem } from '../../utils/cartServieces';
import { changeCartTrigger } from '../../slices/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { Theme } from '../../constatns';

const MiniCard = ({ id, count }: { id: number, count: number }) => {
    const dispatch = useAppDispatch()
    const [productData, setProductsData] = useState<IProductData | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const theme = useAppSelector((state => state.theme))
    const color = theme === Theme.Dark ? 'white' : 'black';

    useEffect(() => {
        setLoading(true)
        getSingleProduct(id)
            .then(res => {
                const { id, title, price, description, category, image, rating } = res;
                setProductsData({
                    id,
                    title,
                    price,
                    description,
                    category,
                    image,
                    rate: rating.rate
                });
            })
            .catch(err => {
                setError(true)
                console.error(err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [id])

    const handleRemove = () => {
        if (!productData) return;
        removeCartItem(productData.id)
        dispatch(changeCartTrigger())
    }

    const handleChangeNum = (num: -1 | 1) => {
        if (!productData) return;
        changeNumCartItem(num, productData.id)
        dispatch(changeCartTrigger())
    }

    return (
        <>
            {loading && <Spinner />}
            {error && <ErrorMessage>Fetching data error</ErrorMessage>}
            {!loading && !error && productData &&
                <div className="mini-card">
                    <div className="mini-card__img">
                        <img src={productData.image} alt={productData.title} />
                    </div>
                    <div className="mini-card__descr">
                        <div className="mini-card__descr-wrapper">
                            <div className="mini-card__name">{productData.title}</div>
                            <div className="mini-card__price">${productData.price}</div>
                        </div>
                        <button className="mini-card__remove" onClick={handleRemove}>remove</button>
                    </div>
                    <div className="mini-card__count">
                        <button className="mini-card__more-btn" onClick={() => handleChangeNum(1)}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                <path d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 
8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 
15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 
10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z" fill={color} />
                            </svg>
                        </button>
                        <div className="mini-card__counter">{count}</div>
                        <button className="mini-card__less-btn" onClick={() => handleChangeNum(-1)}>
                            <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 
16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 
16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763
 9.32016 5.70711 9.71069Z" fill={color} />
                            </svg>
                        </button>
                    </div>
                </div>}
        </>
    );
}

export default MiniCard;
