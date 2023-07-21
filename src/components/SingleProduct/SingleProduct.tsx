import './singleProduct.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleProduct } from '../../api/dataApi';
import { IProductData } from '../../interfaces';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import BuyBtn from '../Buttons/BuyBtn';

const SingleProduct = () => {
    const { id } = useParams();
    const [productData, setProductsData] = useState<IProductData | null>(null);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const numberId = Number(id);
    useEffect(() => {
        setLoading(true)
        getSingleProduct(numberId)
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
    }, [numberId])

    return (
        <div className="main">
            <div className="container">
                {loading && <Spinner />}
                {error && <ErrorMessage>Fetching data error</ErrorMessage>}
                {!loading && !error && productData && <>
                    <div className='product'>
                        <div className="card__img product__img">
                            <img src={productData.image} alt={productData.title} />
                        </div>
                        <div className="card__destc-wrapper product__descr">
                            <h4 className="card__title">{productData.title}</h4>
                            <div className="card__category">{productData.category}</div>
                            <div className="card__descr products__descr">{productData.description}</div>
                            <div className="product__price-wrapper">
                                <div className="card__price">${productData.price}</div>
                                <BuyBtn id={numberId} />
                            </div>
                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default SingleProduct;
