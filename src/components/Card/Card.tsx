import './card.css';
import { Link } from 'react-router-dom';
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
    rate,
    category }: ICard) => {
    return (
        <Link to={`/product/${id}`}>
            <div className="card">
                <div className="card__img">
                    <img src={imgUrl} alt={title} />
                </div>
                <div className="card__destc-wrapper">
                    <h4 className="card__title">{title}</h4>
                    <div className="card__category">{category}</div>
                    <div className="card__descr">{descr}</div>
                    <div className="card__price">${price}</div>
                </div>
            </div>
        </Link>
    );
}

export default Card;
