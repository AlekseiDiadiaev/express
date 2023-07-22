import './like.css';
import { useAppSelector } from '../../hooks/reduxTypesHooks';
import { Theme } from '../../constatns';
import { addLike, cardIsLiked, deleteLike } from '../../utils/likeServices';
import { useEffect, useState } from 'react';
import FIlledHeartSVG from '../SVG/FIlledHeartSVG';

const Like = ({ id }: { id: number }) => {
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        setIsLiked(cardIsLiked(id));
    },[id])   

    const theme = useAppSelector((state => state.theme))
    let color: string;
    if (!isLiked) {
        color = theme === Theme.Dark ? 'white' : 'black';
    } else {
        color =  theme === Theme.Dark ? '#d47b52b3' : '#d47b5259';
    }

    const handleClick = () => {
        if(isLiked){
            deleteLike(id)    
        } else {
            addLike(id)
        }
        setIsLiked(state => !state)
    };

    
    return (
        <button className="liked-btn header__btn card__like" onClick={handleClick}>
            <FIlledHeartSVG color={color} isLiked={isLiked}/>
        </button>
    );
}

export default Like;
