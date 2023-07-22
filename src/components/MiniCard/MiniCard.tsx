
import './miniCard.css';
import { useEffect, useState } from 'react';
import { IProductData } from '../../interfaces';
import { getSingleProduct } from '../../api/dataApi';
import { changeNumCartItem, removeCartItem } from '../../utils/cartServieces';
import { changeCartTrigger } from '../../slices/commonSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { Theme } from '../../constatns';
import ArrowUpSVG from '../SVG/ArrowUpSVG';
import ArrowDownSVG from '../SVG/ArrowDownSVG';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

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
                            <ArrowUpSVG color={color}/>
                        </button>
                        <div className="mini-card__counter">{count}</div>
                        <button className="mini-card__less-btn" onClick={() => handleChangeNum(-1)}>
                            <ArrowDownSVG color={color}/>
                        </button>
                    </div>
                </div>}
        </>
    );
}

export default MiniCard;
