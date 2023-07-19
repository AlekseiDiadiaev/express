import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import { Categories } from '../../constatns';
import './app.css';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';


function App() {
    return (
        <Router>
            <ErrorBoundary><Header/></ErrorBoundary>
            <Routes>
                <Route path='/' element={<MainPage category={Categories.All}/>} />
                <Route path='/men' element={<MainPage category={Categories.Men}/>} />
                <Route path='/woman' element={<MainPage category={Categories.Woman}/>} />
                <Route path='/electronics' element={<MainPage category={Categories.Electronics}/>} />
                <Route path='/jewelery' element={<MainPage category={Categories.Jewelery}/>} />
            </Routes>
        </Router>
    );
}

export default App;
