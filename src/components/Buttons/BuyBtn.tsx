
import { useAppDispatch } from '../../hooks/reduxTypesHooks';
import { changeCartTrigger } from '../../slices/commonSlice';
import { addInCart } from '../../utils/cartServieces';
import './buttons.css';

const BuyBtn = ({id}: {id: number}) => {
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(changeCartTrigger());
        addInCart(id)
    }
    return (
        <button className="buy-btn" onClick={handleClick}>
            Buy
        </button>
    );
}

export default BuyBtn;
