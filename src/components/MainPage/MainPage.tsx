import './mainPage.css';
import Filter from '../Filter/Filter';
import Card from '../Card/Card';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { selectCat } from '../../slices/commonSlice'
import { Categories } from '../../constatns';
import { productsFetched } from '../../slices/asyncThunk';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../errorBoundary/ErrorMessage';

const MainPage = ({ category }: { category: Categories }) => {
    const dispatch = useAppDispatch()
    const productsData = useAppSelector((state => state.productsData))
    const selectedCat = useAppSelector((state => state.selectedCat))
    const error = useAppSelector((state => state.error))
    const loading = useAppSelector((state => state.loading))

    useEffect(() => {
        dispatch(selectCat(category));
    }, [category, dispatch])

    useEffect(() => {
        dispatch(productsFetched())
    }, [dispatch])

    

    return (
        <div className="main">
            <div className="container">
                <div className="main__bar">
                    <h1 className="main__category">{category}</h1>
                    <Filter />
                </div>
                {loading && <Spinner/>}
                {error && <ErrorMessage>Fetching data error</ErrorMessage>}
                <div className="main__cards-wrapper">
                    {!loading && !error && productsData
                        ?.filter(item => {
                            if (selectedCat === Categories.All) return true;
                            console.log(item.category, selectedCat)
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
