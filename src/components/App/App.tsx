import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import { Categories } from '../../constatns';
import './app.css';
import SingleProduct from '../SingleProduct/SingleProduct';
import Cart from '../Cart/Cart';
import Modal from '../Modal/Modal';
import { useAppSelector } from '../../hooks/reduxTypesHooks';


function App() {
    const modalIsOpen = useAppSelector((state => state.modalIsOpen))

    return (
        <Router>
            <Header />
            <Routes>
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
