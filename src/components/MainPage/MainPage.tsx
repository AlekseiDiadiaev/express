import './mainPage.css';
import Filter from '../Filter/Filter';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { selectCat, setProductsData } from '../../slices/commonSlice'
import { Categories } from '../../constatns';
import { sortProducts } from '../../utils/sortProducts';
import { isEqual } from 'lodash';
import { cardIsLiked } from '../../utils/likeServices';

const MainPage = ({ category }: { category: Categories }) => {
    const dispatch = useAppDispatch()
    const productsData = useAppSelector((state => state.productsData))
    const selectedCat = useAppSelector((state => state.selectedCat))
    const error = useAppSelector((state => state.error))
    const loading = useAppSelector((state => state.loading))
    const filter = useAppSelector((state => state.filter))

    useEffect(() => {
        dispatch(selectCat(category));
    }, [category, dispatch])

    useEffect(() => {
        if (productsData) {
            const sortedData = sortProducts(productsData, filter)
            if (!isEqual(productsData, sortedData)) {
                dispatch(setProductsData(sortedData))
            }
        }
    }, [dispatch, filter, productsData])


    return (
        <div className="main">
            <div className="container">
                <div className="main__bar">
                    <h1 className="main__category">{category}</h1>
                    <Filter />
                </div>
                {loading && <Spinner />}
                {error && <ErrorMessage>Fetching data error</ErrorMessage>}
                <div className="main__cards-wrapper">

                    {!loading && !error && productsData
                        ?.filter(item => {
                            if (category === Categories.Liked) {
                                return cardIsLiked(item.id);
                            }
                            if (selectedCat === Categories.All) return true;
                            return item.category === selectedCat
                        })
                        .map(item => {
                            const { id, image, title, price, description, category, rate } = item;
                            return (
                                <Card
                                    key={id}
                                    id={id}
                                    imgUrl={image}
                                    title={title}
                                    price={price}
                                    descr={description}
                                    rate={rate}
                                    category={category}
                                />
                            )
                        })}
                </div>
            </div>
        </div>
    );
}

export default MainPage;
