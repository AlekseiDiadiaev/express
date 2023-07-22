import './app.css';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import SingleProduct from '../SingleProduct/SingleProduct';
import Cart from '../Cart/Cart';
import Modal from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxTypesHooks';
import { productsFetched } from '../../slices/asyncThunk';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Categories } from '../../constatns';
import Page404 from '../404/Page404';

function App() {
    const modalIsOpen = useAppSelector((state => state.modalIsOpen))
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(productsFetched())
    }, [dispatch])

    return (
        <Router>
            <Header />
            <Routes>
                <Route path='*' element={<Page404/>}/>
                <Route path='/' element={<MainPage category={Categories.All} />} />
                <Route path='/men' element={<MainPage category={Categories.Men} />} />
                <Route path='/woman' element={<MainPage category={Categories.Woman} />} />
                <Route path='/electronics' element={<MainPage category={Categories.Electronics} />} />
                <Route path='/jewelery' element={<MainPage category={Categories.Jewelery} />} />
                <Route path='/liked' element={<MainPage category={Categories.Liked} />} />
                <Route path='/product/:id' element={<SingleProduct />} />
            </Routes>
            <Cart />
            {modalIsOpen && <Modal />}
        </Router>
    );
}

export default App;
