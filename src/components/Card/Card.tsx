import './card.css';
import { Link } from 'react-router-dom';
import Like from '../Like/Like';

interface ICard {
    id: number;
    imgUrl: string;
    title: string;
    price: number;
    descr: string;
    rate: number;
    category: string;
}

const Card = ({
    id,
    imgUrl,
    title,
    price,
    descr,
    category }: ICard) => {

    return (
        <div className="card">
            <Like id={id} />
            <Link to={`/product/${id}`}>
                <div className="card__img">
                    <img src={imgUrl} alt={title} />
                </div>
                <div className="card__destc-wrapper">
                    <h4 className="card__title">{title}</h4>
                    <div className="card__category">{category}</div>
                    <div className="card__descr">{descr}</div>
                    <div className="card__price">${price}</div>
                </div>
            </Link>
        </div>
    );
}

export default Card;
